import { useEffect, useMemo, useState } from 'react'
import { calculateFinalResultCredit } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'

import useModal from '../../../hooks/useModal'
import { translatePaymentKey } from '../../../utils/utils'
import { ChevronLeftBtn, ChevronRightBtn } from '../../common/ChevronBtn/chevronBtn'
import ModalDrawer from '../../common/ModalDrawer'
import DivisionListItem from './DivisionListItem'
import EmptyDivisionsList from './EmptyDivisionsList'
import DetailPerExpense from './DivisionsDetail/DetailPerExpense'
import DetailPerPerson from './DivisionsDetail/DetailPerPerson'

const PREV = 'prev'
const NEXT = 'next'

const PaymentNavigation = ({
    payment,
    changePayment,
    creditPayments,
    date,
    expensesInMonth,
    finalResultsGrouped
}) => {
    const { openModal, closeModal, modalIsOpen, modalIsLoading } = useModal()

    console.log('expensesInMonth', expensesInMonth)
    return (
        <div className='flex justify-between items-center px-4'>
            <div className='w-11'>
                {payment !== 0 && <ChevronLeftBtn onClick={() => changePayment(PREV)} />}
            </div>
            <h5
                key={date}
                className='capitalize cursor-pointer hover:bg-gray-100 px-3 py-2 rounded dark:hover:bg-slate-700  '
                onClick={openModal}
            >
                {date}
            </h5>
            <ModalDrawer isOpen={modalIsOpen} closeModal={closeModal}>
                <header className='flex flex-col justify-center items-center gap-5 my-4 '>
                    <h1 className='capitalize m-0'>{date}</h1>
                </header>

                {/* Seleccion de tipo de detalle : Detalle por gasto o detalle por persona  */}

                <DetailPerPerson expensesInMonth={expensesInMonth} />
            </ModalDrawer>
            <div className='w-11'>
                {payment !== creditPayments.length - 1 && (
                    <ChevronRightBtn onClick={() => changePayment(NEXT)} />
                )}
            </div>
        </div>
    )
}

const DivisionListCredit = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)

    useEffect(() => {
        // TODO: Logica para mostrar de entrada el MES ACTUAL.
        // Si el mes actual existe en el arreglo de meses, se muestra ese mes
        // Si No existe :
        // Hay que fijarse si el primer mes del arreglo es mayor al mes actual,
        // Si es mayor, mostrar ese de entrada
        // Sino, mostrar el ultimo del arreglo
    }, [])

    const memoizedResultsCredit = useMemo(() => {
        return calculateFinalResultCredit(persons, expenses)
    }, [expenses])
    console.log('memoizedResultsCredit', memoizedResultsCredit)

    const { finalResults, expensesPerMonth } = memoizedResultsCredit
    console.log('finalResultsCredit', finalResults)

    const creditPayments = Object.keys(finalResults)
    console.log('creditPayments', creditPayments)

    const [paymentIndex, setPaymentIndex] = useState(0)

    const changePayment = action => {
        action === NEXT ? setPaymentIndex(paymentIndex + 1) : setPaymentIndex(paymentIndex - 1)
    }
    const currentPayment = creditPayments[paymentIndex]

    const date = translatePaymentKey(currentPayment)
    const dateData = finalResults[currentPayment]

    const expensesInMonth = expensesPerMonth[currentPayment]

    const group = () => {
        const finalResultGrouped = {}

        dateData.forEach((item, index) => {
            const { personaFrom, personaTo, cantidad, porcentajePersonaFrom } = item
            const { id, name } = personaTo

            const personWhoReceives = finalResultGrouped[id] ?? {
                name,
                total: expensesInMonth.totals[id].amount,
                receipts: []
            }
            personWhoReceives.receipts.push({
                cantidad,
                personaFrom,
                porcentajePersonaFrom
            })
            finalResultGrouped[id] = personWhoReceives
        })
        return finalResultGrouped
    }

    const finalResultsGrouped = group()

    console.log('finalResultsGrouped', finalResultsGrouped)

    // const initialPossiblePersons = structuredClone(expensesInMonth.totals)

    return (
        <Card className='animate-fade'>
            {creditPayments.length === 0 ? (
                <EmptyDivisionsList
                    title='Aún no hay divisiones con crédito...'
                    subtitle=' Aquí verás cuánto le corresponde pagar a cada integrante por cada mes'
                />
            ) : (
                <>
                    <PaymentNavigation
                        payment={paymentIndex}
                        changePayment={changePayment}
                        creditPayments={creditPayments}
                        date={date}
                        expensesInMonth={expensesInMonth}
                        finalResultsGrouped={finalResultsGrouped}
                    />
                    <ul className='py-2 animate-fade' key={creditPayments[paymentIndex]}>
                        {dateData.map((division, index) => (
                            <DivisionListItem key={index} division={division} />
                        ))}
                    </ul>
                </>
            )}
        </Card>
    )
}

export default DivisionListCredit

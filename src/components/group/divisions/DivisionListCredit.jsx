import { useMemo, useState } from 'react'
import { calculateFinalResultCredit } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'

import useModal from '../../../hooks/useModal'
import { floorNumber, getRoundedPercentage, translatePaymentKey } from '../../../utils/utils'
import { ChevronLeftBtn, ChevronRightBtn } from '../../common/ChevronBtn/chevronBtn'
import ModalDrawer from '../../common/ModalDrawer'
import DivisionListItem from './DivisionListItem'
import EmptyDivisionsList from './EmptyDivisionsList'

const PREV = 'prev'
const NEXT = 'next'

const giveClass = 'text-white bg-[#eb0a3a] rounded  font-bold  py-1 px-1 text-xs '
// const receiveClass = 'text-[#52c41a] bg-[#f6ffed] rounded py-1.5'
const receiveClass = 'text-white bg-[#00c28f] rounded  font-bold py-1 px-1 text-xs '

const PaymentNavigation = ({
    payment,
    changePayment,
    creditPayments,
    date,
    gastosEnElMes,
    finalResultsGrouped
}) => {
    const { openModal, closeModal, modalIsOpen, modalIsLoading } = useModal()

    console.log('gastosEnElMes', gastosEnElMes)
    return (
        <div className='flex justify-between items-center px-4'>
            <div className='w-11'>
                {payment !== 0 && <ChevronLeftBtn onClick={() => changePayment(PREV)} />}
            </div>

            <h5 key={date} className='capitalize ' onClick={openModal}>
                {date}
            </h5>
            <ModalDrawer isOpen={modalIsOpen} closeModal={closeModal}>
                <div className=''>
                    <header className='flex flex-col justify-center items-center gap-5 my-4 '>
                        <h1 className='capitalize m-0'>{date}</h1>
                    </header>

                    <section className='max-w-md m-auto mt-10'>
                        <h4 className='m-0'>Gastos involucrados</h4>
                        <ul className=''>
                            {Object.keys(gastosEnElMes.expenses).map(expenseId => {
                                const expenseData = gastosEnElMes.expenses[expenseId]
                                const {
                                    expenseName,
                                    amountsPerPerson,
                                    numberOfPayment,
                                    cantPayments,
                                    amountPerpayment
                                } = expenseData

                                return (
                                    <li className='py-5 my-2 border-b mx-auto' key={expenseId}>
                                        <div className='flex gap-5 items-center justify-between'>
                                            <div className='flex flex-col  my-6'>
                                                <h4 className='m-0  uppercase'>{expenseName}</h4>
                                                <h6 className='m-0 text-gray-500  uppercase'>
                                                    cuota {numberOfPayment} de {cantPayments}
                                                </h6>
                                            </div>
                                            <div className='flex flex-col  my-6'>
                                                <h6 className='m-0 text-gray-500 uppercase'>Total cuota</h6>
                                                <h4 className='m-0  uppercase'>
                                                    {amountPerpayment.toLocaleString('es-AR', {
                                                        style: 'currency',
                                                        currency: 'ARS',
                                                        minimumFractionDigits: 0
                                                    })}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className='flex justify-center flex-wrap gap-2 text-sm '>
                                            {amountsPerPerson.map((amountPerPerson, index) => {
                                                const {
                                                    person: { id, name },
                                                    amount
                                                } = amountPerPerson
                                                return (
                                                    <div
                                                        id={`person-${id}`}
                                                        key={id}
                                                        className='flex flex-col items-center gap-1 '
                                                    >
                                                        <h4 className='m-0 text-gray-500'>{name}</h4>
                                                        <p
                                                            className={
                                                                amount >= 0
                                                                    ? amount > 0
                                                                        ? giveClass
                                                                        : null
                                                                    : receiveClass
                                                            }
                                                        >
                                                            {amount === 0
                                                                ? '-'
                                                                : amount.toLocaleString('es-AR', {
                                                                      style: 'currency',
                                                                      currency: 'ARS',
                                                                      minimumFractionDigits: 0
                                                                  })}
                                                        </p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>

                    {/* <section id='totalPerPersonInMonth' className='max-w-md m-auto py-5'>
                        <div className='flex justify-center flex-wrap gap-2 text-sm '>
                            {Object.keys(gastosEnElMes.totals).map(personId => {
                                const { name, amount } = gastosEnElMes.totals[personId]
                                return (
                                    <div key={personId} className='flex flex-col items-center gap-1 '>
                                        <h4 className='m-0 text-gray-500'>{name}</h4>
                                        <p
                                            className={
                                                amount >= 0 ? (amount > 0 ? giveClass : null) : receiveClass
                                            }
                                        >
                                            {amount === 0 ? '-' : `$${amount}`}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </section> */}
                    <section className='max-w-md m-auto mt-20 '>
                        <h4>¿Cómo se llegó al resultado final?</h4>

                        <ul>
                            {Object.keys(finalResultsGrouped).map(personToReceive => {
                                const { name, total, receipts } = finalResultsGrouped[personToReceive]

                                let nextTotal = total
                                return (
                                    <>
                                        <li
                                            key={receipts[0]}
                                            className='grid grid-cols-[1fr_70%] items-center gap-2 py-4 text-sm'
                                        >
                                            <div className='flex flex-col gap-1 items-center'>
                                                <h5 className='m-0 text-gray-500'>{name} </h5>
                                                <h5 className='m-0 text-gray-500'> debe recibir</h5>
                                                <h5 className={`${receiveClass} m-0`}>
                                                    {total.toLocaleString('es-AR', {
                                                        style: 'currency',
                                                        currency: 'ARS',
                                                        minimumFractionDigits: 0
                                                    })}
                                                </h5>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth='1.5'
                                                    stroke='currentColor'
                                                    className='w-6 h-6'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3'
                                                    />
                                                </svg>
                                            </div>
                                            <div className='grid  gap-2'>
                                                <h4 className='m-0'>
                                                    Personas posibles para saldar la deuda
                                                </h4>
                                                <ul className='flex flex-wrap gap-4 '>
                                                    {Object.keys(receipts[0].possiblePersons).map(
                                                        idPossiblePerson => {
                                                            const { name, amount } =
                                                                receipts[0].possiblePersons[idPossiblePerson]

                                                            return (
                                                                <li
                                                                    key={idPossiblePerson}
                                                                    className={`flex flex-col gap-1 p-1 `}
                                                                >
                                                                    <h4 className='m-0 text-gray-500'>
                                                                        {name}
                                                                    </h4>
                                                                    <h5 className='m-0'>
                                                                        {amount.toLocaleString('es-AR', {
                                                                            style: 'currency',
                                                                            currency: 'ARS',
                                                                            minimumFractionDigits: 0
                                                                        })}
                                                                    </h5>
                                                                </li>
                                                            )
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        </li>

                                        {receipts.map((receipt, index) => {
                                            const {
                                                cantidad,
                                                personaFrom,
                                                porcentajePersonaFrom,
                                                possiblePersons
                                            } = receipt

                                            nextTotal = nextTotal + cantidad

                                            return (
                                                <>
                                                    <li
                                                        key={receipt}
                                                        className='grid grid-cols-[1fr_70%] items-center gap-2 py-4 text-sm'
                                                    >
                                                        <div className='flex flex-col gap-1 items-center'>
                                                            <h5 className='m-0'>- {cantidad}</h5>
                                                            <h5 className='m-0 text-gray-500'>
                                                                Restante a recibir{' '}
                                                            </h5>
                                                            <h4 className='m-0 text-gray-500'> {name}</h4>
                                                            <h5 className={`${receiveClass} m-0`}>
                                                                {nextTotal.toLocaleString('es-AR', {
                                                                    style: 'currency',
                                                                    currency: 'ARS',
                                                                    minimumFractionDigits: 0
                                                                })}
                                                            </h5>
                                                            {index !== receipts.length - 1 && (
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    fill='none'
                                                                    viewBox='0 0 24 24'
                                                                    strokeWidth='1.5'
                                                                    stroke='currentColor'
                                                                    className='w-6 h-6'
                                                                >
                                                                    <path
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                        d='M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3'
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className='grid gap-1'>
                                                            {/* <h4 className='m-0'>Personas posibles</h4> */}
                                                            <ul className='flex flex-wrap gap-4 '>
                                                                {Object.keys(possiblePersons).map(
                                                                    idPossiblePerson => {
                                                                        const { name, amount } =
                                                                            possiblePersons[idPossiblePerson]

                                                                        return (
                                                                            <li
                                                                                key={idPossiblePerson}
                                                                                className={`flex flex-col gap-1 p-1 ${
                                                                                    personaFrom.id ==
                                                                                        idPossiblePerson &&
                                                                                    ' border-primary rounded bg-primary-200 text-primary '
                                                                                }`}
                                                                            >
                                                                                <h4
                                                                                    className={`m-0 text-gray-500  ${
                                                                                        personaFrom.id ==
                                                                                        idPossiblePerson
                                                                                            ? 'text-primary'
                                                                                            : 'text-gray-500'
                                                                                    }`}
                                                                                >
                                                                                    {name}
                                                                                </h4>
                                                                                <h5 className='m-0'>
                                                                                    {amount.toLocaleString(
                                                                                        'es-AR',
                                                                                        {
                                                                                            style: 'currency',
                                                                                            currency: 'ARS',
                                                                                            minimumFractionDigits: 0
                                                                                        }
                                                                                    )}
                                                                                </h5>
                                                                            </li>
                                                                        )
                                                                    }
                                                                )}
                                                            </ul>
                                                            <div className='flex gap-2 '>
                                                                <h5 className='bg-primary-200 px-1 py-0.5 rounded text-primary'>
                                                                    Se elige a {personaFrom.name}
                                                                </h5>
                                                                {/* <h5 className='bg-primary-200 px-1 py-0.5 rounded'>
                                                                    ${cantidad}
                                                                </h5> */}
                                                                <h5 className='bg-primary-200 px-1 py-0.5 rounded text-primary'>
                                                                    {' '}
                                                                    {floorNumber(porcentajePersonaFrom)}% del
                                                                    total
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </>
                                            )
                                        })}
                                        <hr />
                                    </>
                                )
                            })}
                        </ul>
                    </section>
                </div>
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

    const memoizedResultsCredit = useMemo(() => {
        return calculateFinalResultCredit(persons, expenses)
    }, [expenses])
    console.log('memoizedResultsCredit', memoizedResultsCredit)

    const { finalResults, gastosPorMes } = memoizedResultsCredit
    console.log('finalResultsCredit', finalResults)

    const creditPayments = Object.keys(finalResults)

    const [payment, setPayment] = useState(0)

    const changePayment = action => {
        action === NEXT ? setPayment(payment + 1) : setPayment(payment - 1)
    }

    const date = translatePaymentKey(creditPayments[payment])
    const dateData = finalResults[creditPayments[payment]]

    const gastosEnElMes = gastosPorMes[creditPayments[payment]]

    const group = () => {
        const finalResultGrouped = {}

        dateData.forEach((item, index) => {
            const { personaFrom, personaTo, cantidad, porcentajePersonaFrom } = item
            const { id, name } = personaTo

            const personWhoReceives = finalResultGrouped[id] ?? {
                name,
                total: gastosEnElMes.totals[id].amount,
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

    let prevIdPersonWhoReceive = null

    const possiblePersons = structuredClone(gastosEnElMes.totals)
    const asArray = Object.entries(possiblePersons)

    const filtered = asArray.filter(([_, value]) => value.amount > 0)

    const initialPossiblePersons = Object.fromEntries(filtered)

    // const initialPossiblePersons = structuredClone(gastosEnElMes.totals)

    Object.keys(finalResultsGrouped).forEach((idPersonWhoReceive, index) => {
        const group = finalResultsGrouped[idPersonWhoReceive]
        const { receipts } = group

        let prevReceipt
        receipts.forEach((_, indexReceipts) => {
            // Inicializo por primera vez las personas posibles
            if (index === 0 && indexReceipts === 0) {
                group.receipts[indexReceipts].possiblePersons = initialPossiblePersons
            } else {
                // obtengo los datos del receipt anterior. (Puede ser del actual idPersonWhoReceive o del anterior )
                prevReceipt =
                    indexReceipts === 0
                        ? // El receipt es el ultimo receipt del anterior idPersonWhoReceive
                          finalResultsGrouped[prevIdPersonWhoReceive].receipts[
                              finalResultsGrouped[prevIdPersonWhoReceive].receipts.length - 1
                          ]
                        : // El receipt es el anterior del idPersonWhoReceive actual
                          group.receipts[indexReceipts - 1]

                // copio las personas posibles del indexReceipts anterior
                const newPossible = structuredClone(prevReceipt.possiblePersons)

                // Le resto la cantidad del anterior
                newPossible[prevReceipt.personaFrom.id].amount -= prevReceipt.cantidad

                group.receipts[indexReceipts].possiblePersons = newPossible
            }

            // si es el ultimo receipt , actualizo el prevIdPersonWhoReceive
            if (indexReceipts === receipts.length - 1) prevIdPersonWhoReceive = idPersonWhoReceive
        })
    })
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
                        payment={payment}
                        changePayment={changePayment}
                        creditPayments={creditPayments}
                        date={date}
                        gastosEnElMes={gastosEnElMes}
                        finalResultsGrouped={finalResultsGrouped}
                    />
                    <ul className='py-2 animate-fade' key={creditPayments[payment]}>
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

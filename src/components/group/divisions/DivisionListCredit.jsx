import { useMemo, useState } from 'react'
import { calculateFinalResultCredit } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'

import { getRoundedPercentage, translatePaymentKey } from '../../../utils/utils'
import { ChevronLeftBtn, ChevronRightBtn } from '../../common/ChevronBtn/chevronBtn'
import DivisionListItem from './DivisionListItem'
import EmptyDivisionsList from './EmptyDivisionsList'
import ModalDrawer from '../../common/ModalDrawer'
import useModal from '../../../hooks/useModal'
import Index from './../../../pages/Index'

const PREV = 'prev'
const NEXT = 'next'

const giveClass = 'text-red-600 bg-red-100 rounded  font-bold  py-0.5 px-1 text-xs '
// const receiveClass = 'text-[#52c41a] bg-[#f6ffed] rounded py-1.5'
const receiveClass = 'text-green-600 bg-green-100 rounded  font-bold py-0.5 px-1 text-xs '

const PaymentNavigation = ({
    payment,
    changePayment,
    creditPayments,
    date,
    dateData,
    amountsToGivePerPersonInDate,
    amountsToReceivePerPersonInDate
}) => {
    const { openModal, closeModal, modalIsOpen, modalIsLoading } = useModal()

    console.log('dateData', dateData)
    console.log('amountsToGivePerPersonInDate', amountsToGivePerPersonInDate)
    console.log('amountsToReceivePerPersonInDate', amountsToReceivePerPersonInDate)

    const persons = amountsToGivePerPersonInDate.map(amountToGivePerson => amountToGivePerson.person)
    const firstPersonWithAmountToGive = amountsToGivePerPersonInDate.find(
        amountToGivePerson => amountToGivePerson.amount > 0
    )
    const involvedExpenses = firstPersonWithAmountToGive.detail.map(detail => ({
        name: detail.expense,
        numberOfPayment: detail.numberOfPayment,
        cantPayments: detail.cantPayments
    }))

    const detailPerson = personId => {
        const detailPerson = amountsToGivePerPersonInDate.find(
            amountToGivePerson => amountToGivePerson.person.id === personId
        )
        console.log('detailPerson', detailPerson)
        return detailPerson.detail
    }
    return (
        <div className='flex justify-between items-center px-4'>
            <div className='w-11'>
                {payment !== 0 && <ChevronLeftBtn onClick={() => changePayment(PREV)} />}
            </div>

            <h5 key={date} className='capitalize ' onClick={openModal}>
                {date}
            </h5>
            <ModalDrawer isOpen={modalIsOpen} closeModal={closeModal}>
                <div className='w-[88%] m-auto'>
                    <header className=' flex flex-col gap-5 my-4'>
                        <h1 className='capitalize m-0'>{date}</h1>
                        <h3 className='m-0'>Gastos involucrados</h3>
                        <ul className=''>
                            {involvedExpenses.map(expense => {
                                const paymentCompletedRoundedPercentage = getRoundedPercentage(
                                    expense.numberOfPayment,
                                    expense.cantPayments
                                )
                                return (
                                    <li key={expense.name} className='flex gap-10 py-3 w-full'>
                                        <h5 className='capitalize m-0 basis-40 '>{expense.name}</h5>
                                        <div className='basis-48 flex flex-col'>
                                            <div
                                                className={`bg-gray-200 rounded-lg h-4 w-full dark:bg-slate-700`}
                                            >
                                                <div
                                                    className='bg-primary rounded-lg h-4'
                                                    style={{
                                                        width: `${paymentCompletedRoundedPercentage}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <h6 className='m-0 text-gray-400 ml-auto'>
                                                cuota {expense.numberOfPayment} de {expense.cantPayments}
                                            </h6>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </header>
                    <div className='w-80'>
                        <table className='w-full text-sm text-center border-separate border-spacing-y-4 border-spacing-x-2  table-fixed [-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent)]'>
                            <thead>
                                <tr className=''>
                                    <th></th>
                                    {involvedExpenses.map(expense => (
                                        <th key={expense.name} className=''>
                                            {expense.name}
                                        </th>
                                    ))}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {persons.map(person => (
                                    <tr key={person.id} className='pb-6'>
                                        <td className='text-left '>{person.name}</td>
                                        {detailPerson(person.id)?.map(detail => (
                                            <td
                                                key={detail.expense}
                                                className={detail.amount > 0 ? giveClass : receiveClass}
                                            >
                                                ${detail.amount < 0 ? detail.amount * -1 : detail.amount}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className='border-t'>
                                <tr className='border-t'>
                                    <td className='border-t'></td>

                                    <td className=' border-t font-bold'></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
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

    const { amountsToGivePerPersonPerPayment, amountsToReceivePerPersonPerPayment, finalResults } =
        memoizedResultsCredit

    const creditPayments = Object.keys(finalResults)

    const [payment, setPayment] = useState(0)

    const changePayment = action => {
        action === NEXT ? setPayment(payment + 1) : setPayment(payment - 1)
    }

    const date = translatePaymentKey(creditPayments[payment])
    const dateData = finalResults[creditPayments[payment]]

    const amountsToGivePerPersonInDate = amountsToGivePerPersonPerPayment[creditPayments[payment]]
    const amountsToReceivePerPersonInDate = amountsToReceivePerPersonPerPayment[creditPayments[payment]]

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
                        dateData={dateData}
                        amountsToGivePerPersonInDate={amountsToGivePerPersonInDate}
                        amountsToReceivePerPersonInDate={amountsToReceivePerPersonInDate}
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

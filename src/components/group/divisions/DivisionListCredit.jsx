import { useMemo, useRef, useState, useEffect } from 'react'
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

    const [translate, setTranslate] = useState(0)

    const handleLeft = () => {
        setTranslate(translate + 63)
    }

    const handleRight = () => {
        setTranslate(translate - 63)
    }

    const ref = useRef(null)

    useEffect(() => {
        console.log('width', ref.current ? ref.current.offsetWidth : 0)
    }, [ref.current])

    const cantExpenses = 9
    const classNames = cantExpenses > 6 ? 'w-fit flex justify-evenly gap-4' : 'flex justify-evenly gap-4 '

    return (
        <div className='flex justify-between items-center px-4'>
            <div className='w-11'>
                {payment !== 0 && <ChevronLeftBtn onClick={() => changePayment(PREV)} />}
            </div>

            <h5 key={date} className='capitalize ' onClick={openModal}>
                {date}
            </h5>
            <ModalDrawer isOpen={modalIsOpen} closeModal={closeModal}>
                <div className='m-auto'>
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

                    <div className='grid grid-cols-[100px_1fr_140px] grid-rows-[20%_1fr] text-sm'>
                        <div className='relative flex flex-col justify-between items-center gap-5 row-span-2 border-r bg-gray-100 z-10'>
                            <h3 className='m-0 h-10'></h3>
                            <h4 className='m-0'>juani</h4>
                            <h4 className='m-0'>franco</h4>
                            <h4 className='m-0'>sergio</h4>

                            {translate < 0 && (
                                <button
                                    className='absolute bg-black text-white px-2 rounded hover:bg-gray-700 right-1 top-3'
                                    onClick={handleLeft}
                                >
                                    PREV
                                </button>
                            )}
                        </div>
                        <div
                            className={`row-span-2 relative transition-transform ${classNames}`}
                            style={{ transform: `translateX(${translate}px)` }}
                            ref={ref}
                        >
                            {[...Array(cantExpenses)].map((col, index) => (
                                <div key={index} className='flex flex-col justify-between items-center gap-5'>
                                    <h3 className='m-0 h-10 overflow-hidden text-center'>disney on ice</h3>
                                    <h4 className='m-0'>$4500</h4>
                                    <h4 className='m-0'>$4500</h4>
                                    <h4 className='m-0'>$4500</h4>
                                </div>
                            ))}
                        </div>
                        <div className='relative bg-gray-200 z-10 flex flex-col justify-between items-center gap-5 row-span-2 border-l'>
                            <h3 className='m-0 h-10 text-center'></h3>
                            <h4 className='m-0'>$14500</h4>
                            <h4 className='m-0'>$24500</h4>
                            <h4 className='m-0'>$34500</h4>
                            <button
                                className='absolute bg-black text-white px-2 rounded hover:bg-gray-700 left-1 top-3'
                                onClick={handleRight}
                            >
                                NEXT
                            </button>
                        </div>
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

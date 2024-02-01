import { useMemo, useState } from 'react'
import { NEXT } from '../../../constants'
import { calculateFinalResultCredit, calculateInitialPaymentIndex } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import DivisionListItem from './DivisionListItem'
import PaymentNavigation from './PaymentNavigation'

const CreditDivisionsList = ({ expenses }) => {
    const persons = useGroupStore(state => state.persons)

    const memoizedResultsCredit = useMemo(() => {
        return calculateFinalResultCredit(persons, expenses)
    }, [expenses])

    const { finalResults, expensesPerMonth } = memoizedResultsCredit

    console.log('finalResults ', finalResults)
    const creditPayments = Object.keys(finalResults)

    const memoizedInitialPaymentIndex = useMemo(() => {
        return calculateInitialPaymentIndex(creditPayments)
    }, [])

    const [paymentIndex, setPaymentIndex] = useState(memoizedInitialPaymentIndex)
    const changePayment = action => {
        action === NEXT ? setPaymentIndex(paymentIndex + 1) : setPaymentIndex(paymentIndex - 1)
    }

    const currentPayment = creditPayments[paymentIndex]

    const dateData = finalResults[currentPayment]

    const expensesInMonth = expensesPerMonth[currentPayment]

    return (
        <>
            <PaymentNavigation
                payment={paymentIndex}
                changePayment={changePayment}
                creditPayments={creditPayments}
                currentPayment={currentPayment}
                expensesInMonth={expensesInMonth}
            />
            <ul className='py-2 animate-fade' key={creditPayments[paymentIndex]}>
                {dateData.map((division, index) => (
                    <DivisionListItem key={index} division={division} />
                ))}
            </ul>
        </>
    )
}

export default CreditDivisionsList

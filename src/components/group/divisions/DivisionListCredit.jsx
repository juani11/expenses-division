import { useEffect, useMemo, useState } from 'react'
import { calculateFinalResultCredit, calculateInitialPaymentIndex } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'

import { NEXT } from '../../../constants'
import { translatePaymentKey } from '../../../utils/utils'
import DivisionListItem from './DivisionListItem'
import EmptyDivisionsList from './EmptyDivisionsList'
import PaymentNavigation from './PaymentNavigation'

const DivisionListCredit = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)

    const [paymentIndex, setPaymentIndex] = useState(0)

    const memoizedResultsCredit = useMemo(() => {
        return calculateFinalResultCredit(persons, expenses)
    }, [expenses])

    useEffect(() => {
        const initialPaymentIndex = calculateInitialPaymentIndex(creditPayments)
        setPaymentIndex(initialPaymentIndex)
    }, [])

    const { finalResults, expensesPerMonth } = memoizedResultsCredit

    const creditPayments = Object.keys(finalResults)

    const changePayment = action => {
        action === NEXT ? setPaymentIndex(paymentIndex + 1) : setPaymentIndex(paymentIndex - 1)
    }
    const currentPayment = creditPayments[paymentIndex]

    const date = translatePaymentKey(currentPayment)
    const dateData = finalResults[currentPayment]

    const expensesInMonth = expensesPerMonth[currentPayment]

    return (
        <Card className='animate-fade'>
            {creditPayments.length === 0 ? (
                <EmptyDivisionsList
                    title='Aún no hay divisiones con crédito...'
                    subtitle=' Acá verás cuánto le corresponde pagar a cada integrante por cada mes'
                />
            ) : (
                <>
                    <PaymentNavigation
                        payment={paymentIndex}
                        changePayment={changePayment}
                        creditPayments={creditPayments}
                        date={date}
                        expensesInMonth={expensesInMonth}
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

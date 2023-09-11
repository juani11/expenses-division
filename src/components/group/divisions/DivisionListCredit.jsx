import { useMemo, useState } from 'react'
import { calculateFinalResultCredit } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'

import { translatePaymentKey } from '../../../utils/utils'
import { ChevronLeftBtn, ChevronRightBtn } from '../../common/ChevronBtn/chevronBtn'
import DivisionListItem from './DivisionListItem'
import EmptyDivisionsList from './EmptyDivisionsList'

const PaymentNavigation = ({ payment, changePayment, creditPayments }) => {
    return (
        <div className='flex justify-between items-center px-4'>
            <div className='w-11'>
                {payment !== 0 && <ChevronLeftBtn onClick={() => changePayment(payment - 1)} />}
            </div>

            <h5 key={creditPayments[payment]} className='capitalize '>
                {translatePaymentKey(creditPayments[payment])}
            </h5>

            <div className='w-11'>
                {payment !== creditPayments.length - 1 && (
                    <ChevronRightBtn onClick={() => changePayment(payment + 1)} />
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

    const creditPayments = Object.keys(memoizedResultsCredit)

    const [payment, setPayment] = useState(0)

    const changePayment = payment => {
        setPayment(payment)
    }

    console.log(memoizedResultsCredit)

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
                    />
                    <ul className='py-2 animate-fade' key={creditPayments[payment]}>
                        {memoizedResultsCredit[creditPayments[payment]].map((division, index) => (
                            <DivisionListItem key={index} division={division} />
                        ))}
                    </ul>
                </>
            )}
        </Card>
    )
}

export default DivisionListCredit

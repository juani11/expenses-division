import { useEffect, useMemo, useState } from 'react'
import { calculateFinalResultCredit } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'
import MoneyAmount from '../../common/MoneyAmount'

import { translatePaymentKey } from '../../../utils/utils'
import { ChevronLeftBtn, ChevronRightBtn } from '../../common/ChevronBtn/chevronBtn'
import { ArrowIcon } from '../../icons/icons'
import { PeopleDivisionIllustration } from '../../illustrations/Illustrations'

const EmptyDivisionsList = () => {
    return (
        <div className='flex flex-col justify-center items-center p-10'>
            <PeopleDivisionIllustration width={160} height={180} />
            <h4 className='text-center'>Aún no hay divisiones con crédito...</h4>
            <p className='text-center'>
                {' '}
                Aquí verás cuánto le corresponde pagar a cada integrante por cada mes
            </p>
        </div>
    )
}

const DivisionListItem = ({ division }) => {
    const { personaFrom, personaTo, cantidad } = division
    return (
        <li className='rounded mb-3 hover:bg-gray-50 p-4 dark:hover:bg-slate-600'>
            <div className='flex gap-6 items-center '>
                <div className='flex gap-5 items-center'>
                    <div className='flex flex-col gap-1'>
                        <h5 className='m-0 capitalize w-20 '>{personaFrom.name}</h5>
                        <div className='flex items-center gap-1'>
                            <ArrowIcon />
                            <h5 className='m-0 capitalize ml-auto text-gray-400'>{personaTo.name}</h5>
                        </div>
                    </div>
                </div>
                <div className='ml-auto'>
                    <MoneyAmount amount={cantidad} className='bg-primary  text-white font-bold' />
                </div>
            </div>
        </li>
    )
}

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

    useEffect(() => {
        console.log('Render DivisionListCredit...')
    })
    return (
        <Card className='animate-fade'>
            {creditPayments.length === 0 ? (
                <EmptyDivisionsList />
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

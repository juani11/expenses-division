import React from 'react'
import AddExpense from './AddExpense'
import ExpensesListContainer from './ExpensesListContainer'
import CardHeader from '../../common/CardHeader'
import SkeletonWrapper from '../../common/Skeleton/SkeletonWrapper'
import Skeleton from '../../common/Skeleton/Skeleton'
import { useGroupStore } from '../../../store/store'

const ExpensesLoading = () => {
    return (
        <>
            <CardHeader title={'lista de gastos'}>
                <SkeletonWrapper>
                    <Skeleton type='BUTTON' />
                </SkeletonWrapper>
            </CardHeader>
            <SkeletonWrapper>
                <div className='h-72'>
                    <Skeleton type='BOX' />
                </div>
            </SkeletonWrapper>
        </>
    )
}
const Expenses = () => {
    const loading = useGroupStore(state => state.loading)

    return loading ? (
        <ExpensesLoading />
    ) : (
        <>
            <CardHeader title={'lista de gastos'}>
                <AddExpense />
            </CardHeader>
            <ExpensesListContainer />
        </>
    )
}

export default Expenses

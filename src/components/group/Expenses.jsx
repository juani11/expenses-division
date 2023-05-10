import React from 'react'
import AddExpense from './AddExpense'
import ExpensesListContainer from './ExpensesListContainer'
import CardHeader from '../common/CardHeader'

const Expenses = () => {
    return (
        <>
            <CardHeader title={'lista de gastos'}>
                <AddExpense />
            </CardHeader>
            <ExpensesListContainer />
        </>
    )
}

export default Expenses

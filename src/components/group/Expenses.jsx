import React from 'react'
import AddExpense from './AddExpense'
import ExpensesListContainer from './ExpensesListContainer'

const Expenses = () => {
    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Lista de gastos</h3>
                <AddExpense />
            </div>
            <ExpensesListContainer />
        </>
    )
}

export default Expenses

import React from 'react'
import AddExpense from './AddExpense'
import ExpensesList from './ExpensesList'
const Expenses = () => {
    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Lista de gastos</h3>
                <AddExpense />
            </div>

            <div className='shadow-md bg-white p-5 rounded-3xl border border-secondary'>
                <ExpensesList />
            </div>
        </>
    )
}

export default Expenses

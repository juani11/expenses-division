import { useState } from 'react'
import ExpensesList from './ExpensesList'
import ExpensesListSorter, { DATE } from './ExpensesListSorter'

const ExpensesListContainer = () => {
    const [sortBy, setSortBy] = useState(DATE)

    const handleChange = e => setSortBy(e.target.value)

    return (
        <div className='relative shadow-lg bg-white py-5 px-2 rounded-xl '>
            <ExpensesListSorter sortBy={sortBy} onChangeSort={handleChange} />
            <div className='mt-14'>
                <ExpensesList sortBy={sortBy} />
            </div>
        </div>
    )
}

export default ExpensesListContainer

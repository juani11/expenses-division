import { useState } from 'react'
import { useGroupStore } from '../../store/store'
import EmptyExpensesList from './EmptyExpensesList'
import ExpensesList from './ExpensesList'
import ExpensesListSorter from './ExpensesListSorter'

const ExpensesListContainer = () => {
    const expenses = useGroupStore(state => state.expenses)

    const [sortBy, setSortBy] = useState(null)

    const handleChange = option => setSortBy(option.value)

    return (
        <div className='relative shadow bg-white py-5 px-2 rounded dark:bg-slate-800 dark:border dark:border-slate-700'>
            {expenses?.length === 0 ? (
                <EmptyExpensesList />
            ) : (
                <>
                    <ExpensesListSorter sortBy={sortBy} onChangeSort={handleChange} />
                    <div className='mt-14'>
                        <ExpensesList sortBy={sortBy} expenses={expenses} />
                    </div>
                </>
            )}
        </div>
    )
}

export default ExpensesListContainer

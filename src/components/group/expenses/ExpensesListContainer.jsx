import { useState } from 'react'
import { useGroupStore } from '../../../store/store'
import EmptyExpensesList from './EmptyExpensesList'
import ExpensesList from './ExpensesList'
import ExpensesListSorter from './ExpensesListSorter'
import Card from '../../common/Card'

const ExpensesListContainer = () => {
    const expenses = useGroupStore(state => state.expenses)

    const [sortBy, setSortBy] = useState(null)

    const handleChange = option => setSortBy(option.value)

    return (
        <Card className='relative'>
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
        </Card>
    )
}

export default ExpensesListContainer

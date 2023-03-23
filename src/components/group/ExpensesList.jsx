import { useEffect } from 'react'
import usePagination from '../../hooks/usePagination'
import { useGroupStore } from '../../store/store'
import Pagination from '../common/Pagination'
import ExpensesListItem from './ExpensesListItem'

const ExpensesList = () => {
    const expenses = useGroupStore(state => state.expenses)
    const cantExpenses = expenses.length

    const {
        cantPages,
        currentPage,
        changeCurrentPage,
        prevPage,
        nextPage,
        showPagination,
        indexBegin,
        indexEnd
    } = usePagination(cantExpenses)

    const expensesItemsInCurrentPage = expenses.slice(indexBegin, indexEnd)

    useEffect(() => {
        if (expensesItemsInCurrentPage.length === 0) prevPage()
    })

    return (
        <>
            <ul>
                {expensesItemsInCurrentPage.map(expense => (
                    <ExpensesListItem key={expense.id} expense={expense} />
                ))}
            </ul>
            {showPagination && (
                <Pagination
                    cantPages={cantPages}
                    currentPage={currentPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    changeCurrentPage={changeCurrentPage}
                />
            )}
        </>
    )
}

export default ExpensesList

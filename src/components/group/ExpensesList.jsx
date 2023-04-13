import usePagination from '../../hooks/usePagination'
import { useGroupStore } from '../../store/store'
import Pagination from '../common/Pagination'
import ExpensesListItem from './ExpensesListItem'

const ExpensesList = () => {
    const expenses = useGroupStore(state => state.expenses)

    const {
        cantPages,
        currentPage,
        changeCurrentPage,
        prevPage,
        nextPage,
        showPagination,
        itemsInCurrentPage
    } = usePagination(expenses)

    return (
        <>
            <ul>
                {itemsInCurrentPage.map(expense => (
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

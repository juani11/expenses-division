import usePagination from '../../../hooks/usePagination'
import Pagination from '../../common/Pagination'
import ExpensesListItem from './ExpensesListItem'
import { DATE, PAYER } from './ExpensesListSorter'

const ExpensesList = ({ sortBy, expenses }) => {
    const orderExpenses = [...expenses].sort((exp1, exp2) => {
        if (sortBy === DATE) return expenses
        if (sortBy === PAYER) return exp1.person - exp2.person
        else return exp2.amount - exp1.amount
    })

    const {
        cantPages,
        currentPage,
        changeCurrentPage,
        prevPage,
        nextPage,
        showPagination,
        itemsInCurrentPage
    } = usePagination(orderExpenses)

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

import { useState } from 'react'
import { persons } from '../../mock/mockData'
import { useGroupStore } from '../../store/store'
import { currencyFormat } from '../../utils/utils'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import Pagination from '../common/Pagination'

import MenuSVG from '../svg/MenuSVG'
import AddExpense from './AddExpense'
import RemoveExpense from './RemoveExpense'
import ViewDetailExpense from './ViewDetailExpense'

const PAGINATION_MAX_ITEMS_PER_PAGE = 3

const ExpensesList = () => {
    // const [gastos, setGastos] = useState(expenses)

    const expenses = useGroupStore(state => state.expenses)

    const cantExpenses = expenses.length
    const cantPages = Math.ceil(cantExpenses / PAGINATION_MAX_ITEMS_PER_PAGE)

    const [currentPage, setCurrentPage] = useState(1)
    const indexBegin = (currentPage - 1) * PAGINATION_MAX_ITEMS_PER_PAGE
    const indexEnd = indexBegin + PAGINATION_MAX_ITEMS_PER_PAGE
    const expensesItemsInCurrentPage = expenses.slice(indexBegin, indexEnd)
    const showPagination = cantExpenses > PAGINATION_MAX_ITEMS_PER_PAGE
    const changeCurrentPage = e => {
        setCurrentPage(parseInt(e.target.value))
    }

    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Lista de gastos</h3>
                <AddExpense />
                {/* <RemoveExpense /> */}
            </div>

            <div className='shadow-md bg-white p-5 rounded-3xl border border-secondary'>
                <ul>
                    {expensesItemsInCurrentPage.map(expense => {
                        const { id, person, name, amount } = expense

                        const persona = persons.find(persona => persona.id === person)

                        return (
                            <li key={id} className='grid grid-cols-4 hover:bg-gray-50 border-b'>
                                <div className='col-span-2 flex items-center gap-3'>
                                    <Avatar size={'sm'} color={'bg-secondary'}>
                                        {persona?.name.charAt(0)}
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <h4 className='m-0'>{name}</h4>
                                        <p>{persona?.name}</p>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <h3 className='w-24 bg-primary rounded-2xl text-white text-center p-2 '>
                                        {`${currencyFormat(amount)}`}
                                    </h3>
                                </div>

                                <div className='flex justify-center items-center gap-2'>
                                    <RemoveExpense expenseName={name} expenseId={id} />
                                    <ViewDetailExpense expense={expense} />
                                </div>
                            </li>
                        )
                    })}
                </ul>
                {showPagination && (
                    <Pagination
                        cantPages={cantPages}
                        currentPage={currentPage}
                        changeCurrentPage={changeCurrentPage}
                    />
                )}
            </div>
        </>
    )
}

export default ExpensesList

import { useEffect } from 'react'
import usePagination from '../../hooks/usePagination'
import { persons } from '../../mock/mockData'
import { currencyFormat } from '../../utils/utils'
import Avatar from '../common/Avatar'
import Pagination from '../common/Pagination'

import RemoveExpense from './RemoveExpense'
import ViewDetailExpense from './ViewDetailExpense'

const ExpensesList = ({ expenses }) => {
    const cantExpenses = expenses.length

    const { cantPages, currentPage, changeCurrentPage, prevPage, showPagination, indexBegin, indexEnd } =
        usePagination(cantExpenses)

    const expensesItemsInCurrentPage = expenses.slice(indexBegin, indexEnd)

    useEffect(() => {
        if (expensesItemsInCurrentPage.length === 0) prevPage()
    })

    return (
        <>
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
        </>
    )
}

export default ExpensesList

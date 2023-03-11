import { useState } from 'react'
import { currencyFormat } from '../../utils/utils'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import Pagination from '../common/Pagination'

const PAGINATION_MAX_ITEMS_PER_PAGE = 6

const ExpensesList = ({ expenses }) => {
    console.log(expenses)
    const cantExpenses = expenses.length
    const cantPages = Math.ceil(cantExpenses / PAGINATION_MAX_ITEMS_PER_PAGE)

    const [currentPage, setCurrentPage] = useState(1)
    const indexBegin = (currentPage - 1) * PAGINATION_MAX_ITEMS_PER_PAGE
    const indexEnd = indexBegin + PAGINATION_MAX_ITEMS_PER_PAGE
    const expensesItemsInCurrentPage = expenses.slice(indexBegin, indexEnd)
    const showPagination = cantExpenses !== PAGINATION_MAX_ITEMS_PER_PAGE
    const changeCurrentPage = e => {
        setCurrentPage(parseInt(e.target.value))
    }
    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Lista de gastos</h3>
                <Button>añadir gasto</Button>
            </div>

            <div className='shadow-md bg-white p-5 rounded-3xl border border-secondary'>
                <ul>
                    {expensesItemsInCurrentPage.map(expense => {
                        const { id, person, name, amount } = expense
                        return (
                            <li key={id} className='grid grid-cols-4 hover:bg-gray-50 border-b'>
                                <div className='col-span-2 flex items-center gap-3'>
                                    <Avatar size={'sm'} color={'bg-secondary'}>
                                        {person.charAt(0)}
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <h4 className='m-0'>{person}</h4>
                                        <p>{name}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center '>
                                    <h3 className='w-24 bg-primary rounded-2xl text-white text-center p-2 '>
                                        {`${currencyFormat(amount)}`}
                                    </h3>
                                </div>

                                <div className='flex justify-center items-center gap-2'>
                                    {/* <Avatar size={'xs'} color={'bg-gray-200'}>
                                    {'X'}
                                </Avatar> */}

                                    {/* <Avatar size={'xs'} color={'bg-gray-200'}>
                                    {'0'}
                                </Avatar> */}
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

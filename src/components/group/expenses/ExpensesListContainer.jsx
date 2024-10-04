import { useState } from 'react'
import { useGroupStore } from '../../../store/store'
import Card2 from '../../common/Card2'
import ChipsSelect from '../../common/ChipsSelect'
import EmptyExpensesList from './EmptyExpensesList'
import ExpensesList from './ExpensesList'
import Button from '../../common/Button'

const CHIPS_EXPENSE_TYPE = {
    todos: {
        id: 0
    },
    efectivo: {
        id: 1
    },
    crédito: {
        id: 2
    }
}
const ExpensesListContainer = () => {
    const expenses = useGroupStore(state => state.expenses)

    const [sortBy, setSortBy] = useState(null)

    const handleChange = option => setSortBy(option.value)

    const [selectedChip, setSelectedChip] = useState('todos')

    const handleChangeSelectedChip = chip => {
        setSelectedChip(chip)
    }

    console.log('expenses', expenses)
    const cantExpenses = expenses?.length

    const filterExpenses =
        selectedChip === 'todos'
            ? expenses
            : expenses.filter(expense => expense.type === CHIPS_EXPENSE_TYPE[selectedChip].id)

    return (
        <Card2 className={'relative grid grid-rows-[40px_50px_auto] gap-4 row-span-2 items-start h-[450px]'}>
            <section>
                <h3 className='text-lg'>Últimos gastos</h3>
            </section>
            {cantExpenses === 0 ? (
                <EmptyExpensesList />
            ) : (
                <>
                    <ChipsSelect
                        chipsNames={['todos', 'efectivo', 'crédito']}
                        id={'expenseType'}
                        selectedChip={selectedChip}
                        handleChangeSelectedChip={handleChangeSelectedChip}
                        className={'h-6'}
                    />
                    <section id='latestExpenses' key={selectedChip}>
                        <ExpensesList sortBy={sortBy} expenses={filterExpenses} />
                    </section>
                    {cantExpenses > 5 && (
                        <Button
                            size='xs'
                            variant='subtle'
                            color='secondary'
                            className='absolute top-5 right-3'
                        >
                            Ver todos
                        </Button>
                    )}
                </>
            )}
        </Card2>
    )
}

export default ExpensesListContainer

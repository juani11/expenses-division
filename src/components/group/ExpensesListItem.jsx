import { useGroupStore } from '../../store/store'
import MoneyAmount from '../common/MoneyAmount'
import CreditCardSVG from '../svg/CreditCardSVG'
import RemoveExpense from './RemoveExpense'
import ViewDetailExpense from './ViewDetailExpense'

const ExpensesListItem = ({ expense }) => {
    const { id, person, name, amount } = expense

    const persons = useGroupStore(state => state.persons)

    const persona = persons.find(persona => persona.id === person)
    return (
        <>
            <li
                key={id}
                className='flex  justify-between items-center gap-4 hover:bg-gray-50 rounded-xl mx-2 px-2 dark:hover:bg-slate-600'
            >
                <div className='flex-1 flex items-center gap-10'>
                    <CreditCardSVG />
                    <div className='flex flex-col justify-center items-start w-20 md:w-auto'>
                        <h4 className='m-0 capitalize '>{name}</h4>
                        <h5 className='m-0 text-gray-400 capitalize  '> {persona?.name}</h5>
                    </div>
                </div>
                <div className='basis-48 min-w-[128px]'>
                    <MoneyAmount amount={amount} className='m-4 bg-primary text-white font-bold' />
                </div>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <RemoveExpense expenseName={name} expenseId={id} />
                    <ViewDetailExpense expense={expense} />
                </div>
            </li>
        </>
    )
}

export default ExpensesListItem

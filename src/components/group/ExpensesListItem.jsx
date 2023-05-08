import { persons } from '../../mock/mockData'
import CreditCardSVG from '../svg/CreditCardSVG'
import ExpenseCost from './ExpenseCost'
import RemoveExpense from './RemoveExpense'
import ViewDetailExpense from './ViewDetailExpense'

const ExpensesListItem = ({ expense }) => {
    const { id, person, name, amount } = expense
    const persona = persons.find(persona => persona.id === person)

    return (
        <>
            <li key={id} className=' flex justify-between gap-4 hover:bg-gray-50 rounded-xl my-4 mx-2 px-2'>
                <div className='flex-1 flex items-center gap-3'>
                    <CreditCardSVG />
                    <div className='flex flex-col'>
                        <h4 className='m-0 capitalize '>{name}</h4>
                        <h5 className='m-0 text-gray-400'> {persona?.name}</h5>
                    </div>
                </div>
                <div className='basis-48'>
                    <ExpenseCost cost={amount} />
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

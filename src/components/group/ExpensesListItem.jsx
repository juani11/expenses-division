import { persons } from '../../mock/mockData'
import Avatar from '../common/Avatar'
import ExpenseCost from './ExpenseCost'
import RemoveExpense from './RemoveExpense'
import ViewDetailExpense from './ViewDetailExpense'

const ExpensesListItem = ({ expense }) => {
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
                <ExpenseCost cost={amount} />
            </div>

            <div className='flex justify-center items-center gap-2'>
                <RemoveExpense expenseName={name} expenseId={id} />
                <ViewDetailExpense expense={expense} />
            </div>
        </li>
    )
}

export default ExpensesListItem

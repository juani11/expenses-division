import { CREDIT } from '../../../constants'
import useModal from '../../../hooks/useModal'
import { useGroupStore } from '../../../store/store'
import MoneyAmount from '../../common/MoneyAmount'
import { CashIcon, CreditCardIcon } from '../../icons/icons'
import RemoveExpense from './RemoveExpense'
import ViewDetailExpense from './ViewDetailExpense'

const ExpenseName = ({ name, payerName, onClick }) => {
    return (
        <div
            className='flex-1 flex flex-col justify-center items-start md:w-auto cursor-pointer ml-2 md:ml-6'
            onClick={onClick}
        >
            <h4 className='m-0 capitalize text-sm md:text-base'>{name}</h4>
            <h5 className='m-0 text-xs capitalize text-gray-400'> {payerName}</h5>
        </div>
    )
}
const ExpensesListItem = ({ expense }) => {
    const { id, person: payer, name, amount, type } = expense

    const persons = useGroupStore(state => state.persons)

    const person = persons.find(person => person.id === payer)

    const { openModal, closeModal, modalIsOpen } = useModal()

    return (
        <li
            key={id}
            className='flex justify-between items-center gap-4 hover:bg-gray-50 rounded-xl mx-2 px-2 dark:hover:bg-slate-600'
        >
            {type === CREDIT ? <CreditCardIcon /> : <CashIcon />}

            <ExpenseName name={name} payerName={person?.name} onClick={openModal} />

            <div className='min-w-[85px] md:min-w-[128px] md:basis-48'>
                <MoneyAmount amount={amount} className='my-4 bg-primary text-white font-bold' />
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
                <RemoveExpense expenseName={name} expenseId={id} />
            </div>
            <ViewDetailExpense expense={expense} modalIsOpen={modalIsOpen} closeModal={closeModal} />
        </li>
    )
}

export default ExpensesListItem

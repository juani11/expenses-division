import { CREDIT } from '../../constants'
import useModal from '../../hooks/useModal'
import { useGroupStore } from '../../store/store'
import MoneyAmount from '../common/MoneyAmount'
import CashSVG from '../svg/CashSVG'
import CreditCardSVG from '../svg/CreditCardSVG'
import RemoveExpense from './RemoveExpense'
import ViewDetailExpense from './ViewDetailExpense'

const ExpensesListItem = ({ expense }) => {
    const { id, person, name, amount, type } = expense

    const persons = useGroupStore(state => state.persons)

    const persona = persons.find(persona => persona.id === person)

    const { openModal, closeModal, modalIsOpen } = useModal()

    return (
        <li
            key={id}
            className='flex justify-between items-center gap-4 hover:bg-gray-50 rounded-xl mx-2 px-2 dark:hover:bg-slate-600'
        >
            <div className='flex-1 flex items-center gap-10  cursor-pointer' onClick={openModal}>
                {type === CREDIT ? <CreditCardSVG /> : <CashSVG />}
                <div className='flex flex-col justify-center items-start w-20 md:w-auto'>
                    <h4 className='m-0 capitalize'>{name}</h4>
                    <h5 className='m-0 text-xs capitalize text-gray-400'> {persona?.name}</h5>
                </div>
            </div>
            <div className='basis-48 min-w-[128px] m-auto'>
                <MoneyAmount amount={amount} className='m-4 bg-primary text-white font-bold' />
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
                <RemoveExpense expenseName={name} expenseId={id} />
            </div>
            <ViewDetailExpense expense={expense} modalIsOpen={modalIsOpen} closeModal={closeModal} />
        </li>
    )
}

export default ExpensesListItem

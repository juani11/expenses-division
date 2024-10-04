import useModal from '../../../hooks/useModal'
import { useGroupStore } from '../../../store/store'
import Amount from '../../common/Amount'
import Button from '../../common/Button'
import { MenuIcon } from '../../icons/icons'
import ViewDetailExpense from './ViewDetailExpense'

const nameClassname = `font-medium `
const subTitleClassname = `font-light text-xs`
const amountClassname = `font-extrabold text-sm`

const ExpenseName = ({ name, payerName, onClick }) => {
    return (
        <div className='flex flex-col items-start  cursor-pointer' onClick={onClick}>
            <h4 className={nameClassname}>{name}</h4>
            <div className='flex gap-3 items-center'>
                <h6 className={subTitleClassname}>Pagado por {payerName}</h6>
            </div>
        </div>
    )
}
const ExpensesListItem = ({ expense }) => {
    const { id, person: payer, name, amount } = expense

    const persons = useGroupStore(state => state.persons)

    const person = persons.find(person => person.id === payer)

    const { openModal, closeModal, modalIsOpen } = useModal()

    return (
        <>
            <li className='flex gap-8 items-center animate-fadeLeft' key={id}>
                <ExpenseName name={name} payerName={person?.name} onClick={openModal} />
                <Amount amount={amount} className={`${amountClassname} ml-auto`} />
                <Button size='icon' variant='subtle'>
                    <MenuIcon className={'w-4 h-4'} />
                </Button>
            </li>
            <ViewDetailExpense expense={expense} modalIsOpen={modalIsOpen} closeModal={closeModal} />
        </>
    )
}

export default ExpensesListItem

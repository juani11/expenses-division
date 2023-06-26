import useModal from '../../hooks/useModal'
import { INCLUDE, useGroupStore } from '../../store/store'
import { currencyFormat, formatedDate, toFloat } from '../../utils/utils'
import Avatar from '../common/Avatar'

import MenuSVG from '../svg/MenuSVG'
import Modal from './../common/Modal'
import PieChartSVG from './../svg/PieChartSVG'
import ExcludedPersons from './ExcludedPersons'
import ExpenseCost from './ExpenseCost'
import IncludedPersons from './IncludedPersons'

const PaidBy = ({ personId }) => {
    const personName = useGroupStore(state => state.personName)

    return (
        <div className='text-white text-sm font-bold rounded py-0.5 px-2 bg-primary-500 '>
            <span>Pagado por </span>
            <span className='uppercase'>{personName(personId)}</span>
        </div>
    )
}

const BasicInformation = ({ personId, name, date, amount }) => {
    return (
        <div className='flex gap-28 mt-10 mb-4'>
            <div className='flex flex-col items-start'>
                <h3 className='capitalize  underline text-2xl m-0'>{name}</h3>
                <div className='mt-3 flex flex-col gap-2'>
                    <ExpenseCost cost={amount} />
                </div>
                <span className='capitalize text-sm text-gray-700 mt-5'>{formatedDate(date)}</span>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <PieChartSVG width={150} height={120} />
                <PaidBy personId={personId} />
            </div>
        </div>
    )
}

const ViewDetailExpense = ({ expense }) => {
    const { id, person, name, date, amount, includedPersons } = expense

    const excludedPersonsInExpense = useGroupStore(state => state.excludedPersonsInExpense)

    const costPerPerson = currencyFormat(toFloat(amount / includedPersons.length))

    const { openModal, closeModal, modalIsOpen, modalIsLoading } = useModal()

    const excludedPersons = excludedPersonsInExpense(id)

    const handleClick = (action, personId) => {
        const newIncludedPersonsInExpense =
            action === INCLUDE
                ? [...includedPersons, personId]
                : includedPersons.filter(person => person !== personId)

        return newIncludedPersonsInExpense
    }

    return (
        <>
            <Avatar size={'xs'} color={'hover:bg-gray-100'} onClick={openModal}>
                <MenuSVG width={20} height={20} />
            </Avatar>

            <Modal
                title='Información del gasto'
                isOpen={modalIsOpen}
                closeModal={closeModal}
                isLoading={modalIsLoading}
                closable
            >
                <BasicInformation personId={person} name={name} date={date} amount={amount} />

                <IncludedPersons
                    persons={includedPersons}
                    costPerPerson={costPerPerson}
                    expenseId={id}
                    callback={handleClick}
                />
                <ExcludedPersons persons={excludedPersons} expenseId={id} callback={handleClick} />
            </Modal>
        </>
    )
}

export default ViewDetailExpense

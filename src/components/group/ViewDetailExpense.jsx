import useModal from '../../hooks/useModal'
import { EXCLUDE, INCLUDE, useGroupStore } from '../../store/store'
import { currencyFormat, toFloat } from '../../utils/utils'
import Avatar from '../common/Avatar'

import MenuSVG from '../svg/MenuSVG'
import Modal from './../common/Modal'
import PieChartSVG from './../svg/PieChartSVG'
import ExcludedPersons from './ExcludedPersons'
import ExpenseCost from './ExpenseCost'
import IncludedPersons from './IncludedPersons'

// const cantPersons = persons.length - excludedPerson.length

const ViewDetailExpense = ({ expense }) => {
    const { id, person, name, date, amount, includedPersons } = expense

    const costPerPerson = currencyFormat(toFloat(amount / includedPersons.length))

    const excludedPersonsInExpense = useGroupStore(state => state.excludedPersonsInExpense)
    const personName = useGroupStore(state => state.personName)
    const handlePersonInExpense = useGroupStore(state => state.handlePersonInExpense)

    const excludedPersons = excludedPersonsInExpense(includedPersons)

    const excludePerson = personId => () => handlePersonInExpense(personId, id, EXCLUDE)
    const includePerson = personId => () => handlePersonInExpense(personId, id, INCLUDE)

    const { openModal, closeModal, modalIsOpen, modalIsLoading } = useModal()

    return (
        <>
            <Avatar size={'sm'} color={'hover:bg-gray-100'} onClick={openModal}>
                <MenuSVG />
            </Avatar>

            <Modal
                title='Información del gasto'
                isOpen={modalIsOpen}
                closeModal={closeModal}
                isLoading={modalIsLoading}
                closable
                // callback={handleSubmit(onSubmit)}
            >
                <div className='flex justify-between items-center mt-10'>
                    <div className='flex flex-col'>
                        <h3 className='underline text-2xl m-0'>{name}</h3>
                        <p className='uppercase'>{date}</p>
                        <ExpenseCost cost={amount} />
                        <div className='bg-primary py-1 px-2 rounded-lg text-white font-bold'>
                            <span>Pagado por </span>
                            <span>{personName(person)}</span>
                        </div>
                    </div>
                    <PieChartSVG width={180} height={150} />
                </div>
                <IncludedPersons
                    persons={includedPersons}
                    costPerPerson={costPerPerson}
                    excludePerson={excludePerson}
                />
                <ExcludedPersons persons={excludedPersons} includePerson={includePerson} />
            </Modal>
        </>
    )
}

export default ViewDetailExpense

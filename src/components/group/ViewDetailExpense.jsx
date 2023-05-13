import useModal from '../../hooks/useModal'
import { EXCLUDE, INCLUDE, useGroupStore } from '../../store/store'
import { currencyFormat, toFloat } from '../../utils/utils'
import Avatar from '../common/Avatar'

import MenuSVG from '../svg/MenuSVG'
import Modal from './../common/Modal'
import PieChartSVG from './../svg/PieChartSVG'
import ExcludedPerson from './ExcludedPerson'
import ExpenseCost from './ExpenseCost'
import IncludedPerson from './IncludedPerson'

// const cantPersons = persons.length - excludedPerson.length

const ViewDetailExpense = ({ expense }) => {
    const { id, person, name, date, amount, includedPersons } = expense

    const personName = useGroupStore(state => state.personName)

    // const includedPersonsInExpense = useGroupStore(state => state.includedPersonsInExpense)
    const excludedPersonsInExpense = useGroupStore(state => state.excludedPersonsInExpense)

    const handlePersonInExpense = useGroupStore(state => state.handlePersonInExpense)

    const { openModal, closeModal, modalIsOpen, modalIsLoading } = useModal()

    // const personName = personId => {
    //     const person = persons.find(p => p.id === personId)
    //     return person.name
    // }

    // const includedPersons = includedPersonsInExpense(excludedPersons)
    const excludedPersons = excludedPersonsInExpense(includedPersons)

    const excludePerson = personId => handlePersonInExpense(personId, id, EXCLUDE)
    const includePerson = personId => handlePersonInExpense(personId, id, INCLUDE)

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
                    </div>
                    <PieChartSVG width={180} height={150} />
                </div>

                <div className='flex items-center justify-between'>
                    <h5 className=' rounded-xl w-max p-2 bg-gray-50'>Personas incluidas en el gasto</h5>
                </div>
                <ul>
                    {includedPersons.map(includedPerson => (
                        <IncludedPerson
                            key={includedPerson}
                            person={personName(includedPerson)}
                            cost={currencyFormat(toFloat(amount / includedPersons.length))}
                            callback={excludePerson}
                        />
                    ))}
                </ul>
                <hr></hr>

                <h5 className='rounded-xl w-max p-2 bg-gray-50'>Personas excluidas en el gasto</h5>
                {excludedPersons.length === 0 ? (
                    <p className='px-2'>No hay personas excluidas en el gasto</p>
                ) : (
                    <ul>
                        {excludedPersons.map(excludedPerson => (
                            <ExcludedPerson
                                key={excludedPerson}
                                person={excludedPerson}
                                personName={personName(excludedPerson.id)}
                                callback={includePerson}
                            />
                        ))}
                    </ul>
                )}
            </Modal>
        </>
    )
}

export default ViewDetailExpense

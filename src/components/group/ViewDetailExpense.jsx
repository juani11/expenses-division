import useModal from '../../hooks/useModal'
import { useGroupStore } from '../../store/store'
import { currencyFormat, toFloat } from '../../utils/utils'
import Avatar from '../common/Avatar'

import MenuSVG from '../svg/MenuSVG'
import Modal from './../common/Modal'
import ExcludedPerson from './ExcludedPerson'
import ExpenseCost from './ExpenseCost'
import IncludedPerson from './IncludedPerson'
import PieChartSVG from './../svg/PieChartSVG'

const ViewDetailExpense = ({ expense }) => {
    const { id, person, name, date, amount, excludedPersons } = expense

    const persons = useGroupStore(state => state.persons)

    const { openModal, closeModal, modalIsOpen, modalIsLoading } = useModal()

    const personName = personId => {
        const person = persons.find(p => p.id === personId)
        return person.name
    }

    const includedPersons =
        excludedPersons.length === 0
            ? persons
            : persons.filter(person => !excludedPersons.includes(person.id))

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
                            key={includedPerson.id}
                            personName={includedPerson.name}
                            cost={currencyFormat(toFloat(amount / includedPersons.length))}
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
                            <ExcludedPerson key={person.id} personName={personName(excludedPerson)} />
                        ))}
                    </ul>
                )}
            </Modal>
        </>
    )
}

export default ViewDetailExpense

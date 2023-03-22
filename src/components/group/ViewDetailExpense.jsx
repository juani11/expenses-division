import useModal from '../../hooks/useModal'
import { useGroupStore } from '../../store/store'
import { currencyFormat, toFloat } from '../../utils/utils'
import Avatar from '../common/Avatar'

import MenuSVG from '../svg/MenuSVG'
import Modal from './../common/Modal'
import ExcludedPerson from './ExcludedPerson'
import IncludedPerson from './IncludedPerson'

const ViewDetailExpense = ({ expense }) => {
    //     const addExpense = useGroupStore(state => state.addExpense)

    // const addExpenseOnState = formData => {
    //     const { name, person, amount } = formData
    //     const newExpense = {
    //         name,
    //         amount,
    //         person: parseInt(person),
    //         excludedPersons: []
    //     }
    //     addExpense(newExpense)
    // }

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
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3 className=' m-0 w-24 bg-primary rounded-2xl text-white text-center p-2 '>
                            {`${currencyFormat(amount)}`}
                        </h3>
                        {/* <p className='bg-pink-600 px-2 rounded-lg text-white font-bold'>
                            costo por persona: {currencyFormat(amount / includedPersons.length)}
                        </p> */}
                    </div>
                </div>

                <h5 className=' rounded-xl w-max p-2'>Personas incluidas en el gasto</h5>
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
                {/* <div className='flex justify-between  p-2'>
                    <h3 className='m-0'>Costo por persona: </h3>
                    <h3 className='m-0 w-24 rounded-2xl text-white text-center   bg-primary '>
                        {currencyFormat(amount / includedPersons.length)}
                    </h3>
                </div> */}
                <h5 className='rounded-xl w-max p-2'>Personas excluidas en el gasto</h5>
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

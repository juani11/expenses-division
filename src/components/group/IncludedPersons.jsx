import { useGroupStore } from '../../store/store'
import Button from '../common/Button'
import PersonDetail from './PersonDetail'

const IncludedPersons = ({ persons, costPerPerson, excludePerson }) => {
    const personName = useGroupStore(state => state.personName)

    return (
        <>
            <div className='flex items-center justify-between'>
                <h5 className=' rounded-xl w-max p-2 bg-gray-50'>Personas incluidas en el gasto</h5>
            </div>
            <ul>
                {persons.map(includedPerson => {
                    const name = personName(includedPerson)
                    return (
                        <PersonDetail key={includedPerson} personName={name} cost={costPerPerson}>
                            <Button size='xs' onClick={excludePerson(includedPerson)}>
                                Excluir
                            </Button>
                        </PersonDetail>
                    )
                })}
            </ul>
        </>
    )
}

export default IncludedPersons

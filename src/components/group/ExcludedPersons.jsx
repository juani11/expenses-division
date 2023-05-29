import Button from '../common/Button'
import PersonDetail from './PersonDetail'

const ExcludedPersons = ({ persons, includePerson }) => {
    return (
        <>
            <h5 className='rounded-xl w-max p-2 bg-gray-50'>Personas excluidas en el gasto</h5>
            {persons.length === 0 ? (
                <p className='px-2'>No hay personas excluidas en el gasto</p>
            ) : (
                <ul>
                    {persons.map(excludedPerson => {
                        const { id, name } = excludedPerson
                        return (
                            <PersonDetail key={id} personName={name}>
                                <Button size='xs' onClick={includePerson(id)}>
                                    Incluir
                                </Button>
                            </PersonDetail>
                        )
                    })}
                </ul>
            )}
        </>
    )
}

export default ExcludedPersons

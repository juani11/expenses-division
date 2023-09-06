import { INCLUDE } from '../../store/store'
import Button from '../common/Button'
import PersonDetail from './PersonDetail'

const ExcludedPersons = ({ persons, expenseId, callback }) => {
    return (
        <>
            <h5 className='m-0 rounded w-max p-2 bg-gray-50 dark:bg-slate-700'>Personas excluidas</h5>
            {persons.length === 0 ? (
                <p className='px-2'>No hay personas excluidas en el gasto</p>
            ) : (
                <ul>
                    {persons.map(excludedPerson => {
                        return (
                            <PersonDetail key={excludedPerson} person={excludedPerson} expenseId={expenseId}>
                                {(loading, onClick) => {
                                    const newIncludedPersonsInExpense = callback(INCLUDE, excludedPerson)

                                    return (
                                        <Button
                                            size='xs'
                                            loading={loading}
                                            onClick={() => onClick(newIncludedPersonsInExpense)}
                                        >
                                            Incluir
                                        </Button>
                                    )
                                }}
                            </PersonDetail>
                        )
                    })}
                </ul>
            )}
        </>
    )
}

export default ExcludedPersons

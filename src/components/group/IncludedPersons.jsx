import { EXCLUDE } from '../../store/store'
import Button from '../common/Button'
import PersonDetail from './PersonDetail'

const IncludedPersons = ({ persons, costPerPerson, expenseId, callback, type, creditTypeInfo }) => {
    return (
        <>
            <div className='flex items-center justify-between'>
                <h5 className=' rounded w-max p-2 bg-gray-50 dark:bg-slate-700'>Personas incluidas</h5>
            </div>
            <ul>
                {persons.map(includedPerson => {
                    return (
                        <PersonDetail
                            key={includedPerson}
                            person={includedPerson}
                            cost={costPerPerson}
                            expenseId={expenseId}
                            type={type}
                            creditTypeInfo={creditTypeInfo}
                        >
                            {(loading, onClick) => {
                                const newIncludedPersonsInExpense = callback(EXCLUDE, includedPerson)

                                return (
                                    <Button
                                        size='xs'
                                        loading={loading}
                                        onClick={() => onClick(newIncludedPersonsInExpense)}
                                    >
                                        Excluir
                                    </Button>
                                )
                            }}
                        </PersonDetail>
                    )
                })}
            </ul>
        </>
    )
}

export default IncludedPersons

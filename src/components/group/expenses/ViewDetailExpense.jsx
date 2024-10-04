import { INCLUDE, useGroupStore } from '../../../store/store'
import { formatedDate } from '../../../utils/utils'
import { CREDIT } from '../../../constants'
import Amount from '../../common/Amount'
import ModalDrawer from '../../common/ModalDrawer'
import Tag from '../../common/Tag'
import { CashIcon } from '../../icons/icons'
import CreditTypeDetail from './CreditTypeDetail'
import ExcludePersonFromExpense from './ExcludePersonFromExpense'
import IncludePersonToExpense from './IncludePersonToExpense'
import PersonDetail from './PersonDetail'

const ViewDetailExpense = ({ expense, modalIsOpen, closeModal }) => {
    const { id, person, name, date, amount, includedPersons, type, creditTypeInfo } = expense

    const excludedPersonsInExpense = useGroupStore(state => state.excludedPersonsInExpense)

    const costPerPerson = amount / includedPersons.length

    const excludedPersons = excludedPersonsInExpense(id)

    const newIncludedPersonsInExpense = (action, personId) => {
        const newIncludedPersonsInExpense =
            action === INCLUDE
                ? [...includedPersons, personId]
                : includedPersons.filter(person => person !== personId)

        return newIncludedPersonsInExpense
    }

    const personName = useGroupStore(state => state.personName)

    return (
        <ModalDrawer title='Información del gasto' isOpen={modalIsOpen} closeModal={closeModal}>
            <div className='flex flex-col gap-2 mt-6'>
                <header>
                    <section className='flex flex-col gap-2'>
                        <h1 className='font-medium text-lg'>{name} </h1>
                        <div className='flex flex-col gap-2 items-start'>
                            <Amount amount={amount} className={`text-2xl font-extrabold w-max`} />
                            {type === CREDIT ? (
                                <CreditTypeDetail creditInfo={creditTypeInfo} />
                            ) : (
                                <Tag className='bg-gray-50' size='xs'>
                                    <h5>Efectivo</h5>
                                </Tag>
                            )}
                        </div>
                    </section>

                    <section className=' absolute top-0 right-0 flex flex-col items-end gap-2'>
                        <Tag className='bg-gray-50' size='xs'>
                            <CashIcon className={'w-4 h-4'} />
                            <h5>{`Pagado por ${personName(person)}`}</h5>
                        </Tag>
                        <p className='text-gray-400 text-sm'>{formatedDate(date)} </p>
                    </section>
                </header>

                <section className='pt-10 pb-2' id='includedPersons'>
                    <h3 className='text-md mb-2'>Personas incluidas</h3>
                    <ul>
                        {includedPersons.map(includedPerson => {
                            const includedPersonName = personName(includedPerson)
                            return (
                                <PersonDetail
                                    key={includedPerson}
                                    personName={includedPersonName}
                                    costPerPerson={costPerPerson}
                                >
                                    <ExcludePersonFromExpense
                                        person={{ id: includedPerson, name: includedPersonName }}
                                        callback={newIncludedPersonsInExpense}
                                        expenseId={id}
                                    />
                                </PersonDetail>
                            )
                        })}
                    </ul>
                </section>

                <section className='pt-6 pb-2' id='excludedPersons'>
                    <h3 className='text-md mb-2'>Personas excluidas</h3>

                    {excludedPersons.length === 0 ? (
                        <p className='text-sm font-semibold'>No hay personas excluidas en el gasto</p>
                    ) : (
                        <ul>
                            {excludedPersons.map(excludedPerson => {
                                const excludedPersonName = personName(excludedPerson)
                                return (
                                    <PersonDetail key={excludedPerson} personName={excludedPersonName}>
                                        <IncludePersonToExpense
                                            person={{ id: excludedPerson, name: excludedPersonName }}
                                            callback={newIncludedPersonsInExpense}
                                            expenseId={id}
                                        />
                                    </PersonDetail>
                                )
                            })}
                        </ul>
                    )}
                </section>
            </div>
        </ModalDrawer>
    )
}

export default ViewDetailExpense

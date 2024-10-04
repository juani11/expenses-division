import { EXCLUDE, INCLUDE, useGroupStore } from '../../../store/store'
import { capitalizeFirstLetter, formatedDate } from '../../../utils/utils'

import { CREDIT, LEFT } from '../../../constants'
import useIncludeExcludePerson from '../../../hooks/useIncludeExcludePerson'
import Amount from '../../common/Amount'
import IconButton from '../../common/IconButton'
import ModalDrawer from '../../common/ModalDrawer'
import Tag from '../../common/Tag'
import Tooltip from '../../common/Tooltip'
import { CashIcon, UserMinusIcon, UserPlusIcon } from '../../icons/icons'
import CreditTypeDetail from './CreditTypeDetail'
import PersonDetail from './PersonDetail'
import useNotification from '../../../hooks/useNotification'

const ExcludePersonBtn = ({ onClick }) => {
    return <IconButton variant='light' onClick={onClick} icon={UserMinusIcon} />
}

const IncludePersonBtn = ({ onClick }) => {
    return <IconButton variant='light' onClick={onClick} icon={UserPlusIcon} />
}

const ExcludePersonFromExpense = ({ person: { id, name }, callback, expenseId }) => {
    const updateIncludedPersonsInExpense = useIncludeExcludePerson(expenseId)
    const { successNotification, errorNotification } = useNotification()

    const onOkTooltip = () => {
        const newIncludedPersonsInExpense = callback(EXCLUDE, id)
        return updateIncludedPersonsInExpense(newIncludedPersonsInExpense)
    }

    const onSuccess = () => successNotification('Persona excluida del gasto correctamente!')
    const onError = () => errorNotification('Se produjo un error al excluir la persona del gasto')

    return (
        <Tooltip
            title={`¿Excluir a ${capitalizeFirstLetter(name)} del gasto?`}
            callbackOnOk={onOkTooltip}
            component={ExcludePersonBtn}
            position={LEFT}
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}

const IncludePersonToExpense = ({ person: { id, name }, callback, expenseId }) => {
    const updateIncludedPersonsInExpense = useIncludeExcludePerson(expenseId)
    const { successNotification, errorNotification } = useNotification()

    const onOkTooltip = () => {
        const newIncludedPersonsInExpense = callback(INCLUDE, id)
        return updateIncludedPersonsInExpense(newIncludedPersonsInExpense)
    }

    const onSuccess = () => successNotification('Persona incluida al gasto correctamente!')
    const onError = () => errorNotification('Se produjo un error al incluir la persona al gasto')

    return (
        <Tooltip
            title={`¿Incluir a ${capitalizeFirstLetter(name)} al gasto?`}
            callbackOnOk={onOkTooltip}
            component={IncludePersonBtn}
            position={LEFT}
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}

const ViewDetailExpense = ({ expense, modalIsOpen, closeModal }) => {
    const { id, person, name, date, amount, includedPersons, type, creditTypeInfo } = expense

    const excludedPersonsInExpense = useGroupStore(state => state.excludedPersonsInExpense)

    const costPerPerson = amount / includedPersons.length

    const excludedPersons = excludedPersonsInExpense(id)

    const handleClick = (action, personId) => {
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
                                        callback={handleClick}
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
                                            callback={handleClick}
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

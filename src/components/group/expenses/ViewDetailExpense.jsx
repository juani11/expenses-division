import { INCLUDE, useGroupStore } from '../../../store/store'
import { formatedDate } from '../../../utils/utils'

import { CREDIT } from '../../../constants'
import ModalDrawer from '../../common/ModalDrawer'
import Tag from '../../common/Tag'
import { PeopleExpenseIllustration } from '../../illustrations/Illustrations'
import ExpenseCost from '../ExpenseCost'
import CashTypeDetail from './CashTypeDetail'
import CreditTypeDetail from './CreditTypeDetail'
import ExcludedPersons from './ExcludedPersons'
import IncludedPersons from './IncludedPersons'

const TypeDetail = ({ type, creditTypeInfo }) => {
    return type === CREDIT ? <CreditTypeDetail creditInfo={creditTypeInfo} /> : <CashTypeDetail />
}

const PaidBy = ({ personId }) => {
    const personName = useGroupStore(state => state.personName)

    return (
        <Tag>
            Pagado por
            <span className='uppercase '>{personName(personId)}</span>
        </Tag>
    )
}

const ExpenseName = ({ name }) => {
    return <h3 className='capitalize underline text-2xl m-0'>{name}</h3>
}

const ExpenseDate = ({ date }) => {
    return <span className='text-lg capitalize text-gray-700 dark:text-gray-200'>{formatedDate(date)}</span>
}

const BasicInformation = ({ children }) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start gap-3'>{children}</div>
            <PeopleExpenseIllustration width={120} height={200} />
        </div>
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

    return (
        <ModalDrawer title='Información del gasto' isOpen={modalIsOpen} closeModal={closeModal}>
            <BasicInformation>
                <ExpenseName name={name} />
                <ExpenseCost cost={amount} />
                <ExpenseDate date={date} />
                <PaidBy personId={person} />
                <TypeDetail type={type} creditTypeInfo={creditTypeInfo} />
            </BasicInformation>
            <IncludedPersons
                persons={includedPersons}
                costPerPerson={costPerPerson}
                expenseId={id}
                callback={handleClick}
                type={type}
                creditTypeInfo={creditTypeInfo}
            />
            <ExcludedPersons persons={excludedPersons} expenseId={id} callback={handleClick} />
        </ModalDrawer>
    )
}

export default ViewDetailExpense

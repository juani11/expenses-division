import { INCLUDE, useGroupStore } from '../../store/store'
import { formatedDate } from '../../utils/utils'

import { CREDIT } from '../../constants'
import ModalDrawer from '../common/ModalDrawer'
import Tag from '../common/Tag'
import PieChartSVG from './../svg/PieChartSVG'
import CashTypeDetail from './CashTypeDetail'
import CreditTypeDetail from './CreditTypeDetail'
import ExcludedPersons from './ExcludedPersons'
import ExpenseCost from './ExpenseCost'
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

const BasicInformation = ({ personId, name, date, amount, type, creditTypeInfo }) => {
    return (
        <div className='flex items-center'>
            <div className='flex flex-col items-start'>
                <h3 className='capitalize underline text-2xl m-0'>{name}</h3>
                <div className='mt-3 flex flex-col gap-2'>
                    <ExpenseCost cost={amount} />
                </div>
                <span className='text-lg capitalize text-gray-700 mt-3 dark:text-gray-200'>
                    {formatedDate(date)}
                </span>
                <div className='mt-3 mb-3'>
                    <PaidBy personId={personId} />
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <TypeDetail type={type} creditTypeInfo={creditTypeInfo} />
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center ml-auto '>
                <PieChartSVG width={120} height={200} />
            </div>
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
            <BasicInformation
                personId={person}
                name={name}
                date={date}
                amount={amount}
                type={type}
                creditTypeInfo={creditTypeInfo}
            />
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

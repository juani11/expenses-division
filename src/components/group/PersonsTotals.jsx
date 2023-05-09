import { useState } from 'react'
import { expensesPerPerson } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import PersonTotalItem from './PersonsTotalsItem'
import SorterArrowsSVG from '../svg/SorterArrowsSVG'

const SorterButton = ({ ascSort, handleClick }) => {
    return (
        <button
            className='absolute flex gap-2 items-center right-4 bg-gray-100 hover:bg-gray-50 py-1 px-3'
            onClick={handleClick}
        >
            {ascSort ? 'ASC' : 'DESC'}
            <SorterArrowsSVG />
        </button>
    )
}
const PersonsTotals = () => {
    const expenses = useGroupStore(state => state.expenses)
    const totalAmountExpenses = useGroupStore(state => state.totalAmountExpenses)
    const personName = useGroupStore(state => state.personName)

    const totalExpensesPerPerson = expensesPerPerson(expenses)
    const personsTotals = Object.values(totalExpensesPerPerson)

    const totalAmount = totalAmountExpenses()

    const [ascendingSort, setAscendingSort] = useState(false)

    const personsTotalsSorted = [...personsTotals].sort((a, b) => {
        return ascendingSort ? b.amount - a.amount : a.amount - b.amount
    })

    const handleClick = () => setAscendingSort(!ascendingSort)

    return (
        <div className='relative shadow-lg bg-white py-5 px-2 rounded-xl animate-fade'>
            <SorterButton ascSort={ascendingSort} handleClick={handleClick} />
            <ul className='mt-12'>
                {personsTotalsSorted.map(personTotal => {
                    const personId = personTotal.person
                    const nameOfPerson = personName(personId)
                    return (
                        <PersonTotalItem
                            key={personId}
                            personTotal={personTotal}
                            nameOfPerson={nameOfPerson}
                            totalAmountExpenses={totalAmount}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default PersonsTotals

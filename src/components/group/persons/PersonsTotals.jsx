import { useState } from 'react'
import { cantOfOwnExpensesPerPerson, totalAmountOfExpenses } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'
import { SorterArrowsIcon } from '../../icons/icons'
import { PercentageIllustration } from '../../illustrations/Illustrations'
import PersonTotalItem from './PersonsTotalsItem'

const SorterButton = ({ ascSort, handleClick }) => {
    return (
        <button
            className='absolute flex gap-2 items-center right-4 text-sm bg-gray-100 hover:bg-gray-50 py-1 px-3 dark:bg-slate-600 dark:hover:bg-slate-500 '
            onClick={handleClick}
        >
            {ascSort ? 'ASC' : 'DESC'}
            <SorterArrowsIcon />
        </button>
    )
}

const EmptyPersonsTotals = () => {
    return (
        <div className='flex flex-col justify-center items-center p-10'>
            <PercentageIllustration width={160} height={180} />
            <h4 className='text-center'>Aún no hay ningún gasto...</h4>
            <p className='text-center'> Aquí verás los gastos totales por cada integrante</p>
        </div>
    )
}
const PersonsTotals = () => {
    const expenses = useGroupStore(state => state.expenses)
    const personName = useGroupStore(state => state.personName)

    const totalExpensesPerPerson = cantOfOwnExpensesPerPerson(expenses)
    const personsTotals = Object.values(totalExpensesPerPerson)

    const totalAmount = totalAmountOfExpenses(expenses)

    const [ascendingSort, setAscendingSort] = useState(false)

    const personsTotalsSorted = [...personsTotals].sort((a, b) => {
        return ascendingSort ? b.amount - a.amount : a.amount - b.amount
    })

    const handleClick = () => setAscendingSort(!ascendingSort)

    return (
        <Card className='relative animate-fade'>
            {personsTotalsSorted.length === 0 ? (
                <EmptyPersonsTotals />
            ) : (
                <>
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
                </>
            )}
        </Card>
    )
}

export default PersonsTotals

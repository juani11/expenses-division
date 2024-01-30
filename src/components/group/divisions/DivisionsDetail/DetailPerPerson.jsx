import { useState } from 'react'
import { useGroupStore } from '../../../../store/store'
import PersonStats from './PersonStats'
import PersonChart from './PersonsChart'
import PersonExpensesTable from './PersonExpensesTable'

const PersonsList = ({ persons, selectedPerson, handleChangeSelectedPerson }) => {
    return (
        <ul
            id='persons'
            className=' flex justify-center flex-wrap gap-2 py-6 sticky top-0 bg-white z-10 [animation-timeline:scroll()] [animation-range:0_200px] [animation-name:toRight]  [animation-fill-mode:both] dark:bg-slate-800 '
        >
            {persons.map(person => (
                <li
                    key={person.id}
                    className={`px-3 py-1 rounded-md text-sm font-bold cursor-pointer transition capitalize
                        ${
                            person.id === selectedPerson.id
                                ? 'bg-black hover:bg-black border border-black text-white dark:bg-white dark:text-black'
                                : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
                        }
                    }`}
                    onClick={() => handleChangeSelectedPerson(person)}
                >
                    {person.name}
                </li>
            ))}
        </ul>
    )
}
const DetailPerPerson = ({ expensesInMonth }) => {
    const { expenses, totals } = expensesInMonth
    const persons = useGroupStore(state => state.persons)

    const [selectedPerson, setSetselectedPerson] = useState(persons[0])
    const handleChangeSelectedPerson = personId => setSetselectedPerson(personId)

    const { amounts } = totals[selectedPerson.id]

    // Recorrer los gastos. Por cada gasto obtener los totales de la persona seleccionada.
    const expensesNames = []
    const expensesDiff = []
    const expensesTableData = []

    const personStats = {
        totalToPay: amounts.toPay,
        positiveDiff: 0,
        negativeDiff: 0,
        totalDiff: amounts.diff
    }

    const expensesIds = Object.keys(expenses)
    expensesIds.forEach(expenseId => {
        const expense = expenses[Number(expenseId)]
        const { expenseName, amountsPerPerson, cantPayments, numberOfPayment } = expense

        const currentPersonAmountInExpense = amountsPerPerson.find(
            ({ person }) => person.id === selectedPerson.id
        )
        const {
            amountsPerPayment: { toPay, paid, diff }
        } = currentPersonAmountInExpense

        expensesNames.push(expenseName)
        expensesDiff.push(diff)

        if (diff > 0) personStats.positiveDiff += diff
        else personStats.negativeDiff -= diff

        expensesTableData.push({
            id: expenseId,
            name: expenseName,
            cantPayments,
            numberOfPayment,
            amounts: { toPay, paid, diff }
        })
    })

    return (
        <section id='monthDetail' className='px-2 grid gap-2'>
            {/* Seleccion de persona para ver el detalle de esa persona */}

            <PersonsList
                persons={persons}
                selectedPerson={selectedPerson}
                handleChangeSelectedPerson={handleChangeSelectedPerson}
            />
            <PersonStats personName={selectedPerson.name} {...personStats} />

            <PersonChart expensesNames={expensesNames} expensesDiff={expensesDiff} />

            <PersonExpensesTable expenses={expensesTableData} totals={amounts} />
        </section>
    )
}
export default DetailPerPerson

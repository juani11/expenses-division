import { useState } from 'react'
import { useGroupStore } from '../../../../store/store'
import PersonStats from './PersonStats'
import PersonChart from './PersonsChart'
import PersonExpensesTable from './PersonExpensesTable'
import PersonsList from './PersonsList'

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
            amounts: { toPay, paid, diff }
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

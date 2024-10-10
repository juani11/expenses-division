import { useState } from 'react'
import { useGroupStore } from '../../../../store/store'
import ChipsSelect from '../../../common/ChipsSelect'
import PersonExpensesTable from './PersonExpensesTable'
import PersonStats from './PersonStats'

const DetailPerPerson = ({ involvedExpenses }) => {
    const { expenses, totals } = involvedExpenses
    const persons = useGroupStore(state => state.persons)
    const [selectedPerson, setSetselectedPerson] = useState(persons[0])
    // const handleChangeSelectedPerson = personId => setSetselectedPerson(personId)

    const personsChipsData = persons.map(person => ({ id: person.id, name: person.name }))

    const handleChangeSelectedPerson = selectedPerson => {
        // const person = persons.find(person => person.id === id)
        setSetselectedPerson(selectedPerson)
    }

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

            <ChipsSelect
                chipsData={personsChipsData}
                id={'personsDetail'}
                selectedChip={selectedPerson}
                handleChangeSelectedChip={handleChangeSelectedPerson}
                className={'py-6 sticky top-0 z-10'}
                size={'sm'}
            />

            <div className='flex flex-col gap-5 animate-fadeLeft' key={selectedPerson.id}>
                <PersonStats personName={selectedPerson.name} {...personStats} />
                <PersonExpensesTable expenses={expensesTableData} totals={amounts} />
            </div>
        </section>
    )
}
export default DetailPerPerson

import { useState } from 'react'
import { useGroupStore } from '../../../../store/store'
import { formatedAmount } from '../../../../utils/utils'

const diffClassName = value => (value < 0 ? 'text-red-500' : value > 0 && 'text-green-500')

const ExpenseRow = ({ expenseId, expense, selectedPerson }) => {
    const { expenseName, amountsPerPerson, amountPerpayment, cantPayments, numberOfPayment } = expense

    const currentPersonAmountInExpense = amountsPerPerson.find(({ person }) => person.id === selectedPerson)

    const {
        amountsPerPayment: { toPay, paid, diff }
    } = currentPersonAmountInExpense

    const diffColor = diffClassName(diff)

    return (
        <tr key={expenseId} className='bg-white border-b border-gray-50 hover:bg-gray-50 font-bold'>
            <th scope='row' className='flex flex-col items-start px-3 py-3 text-gray-900 whitespace-nowrap '>
                <span>{expenseName} </span>
                <span className='py-0.5 text-gray-400 '>
                    cuota {numberOfPayment} de {cantPayments}
                </span>
                {toPay === 0 && (
                    <span className='bg-primary-200 px-2 py-0.5 rounded text-primary'>Excluido</span>
                )}
            </th>
            <td className='px-3 py-3'>{formatedAmount(toPay)}</td>
            <td className='px-3 py-3'>{formatedAmount(paid)}</td>
            <td className={`px-3 py-3 ${diffColor}`}>{formatedAmount(diff)}</td>
        </tr>
    )
}

const SelectedPersonExpensesTable = ({ expenses, totals, selectedPerson }) => {
    const expensesIds = Object.keys(expenses)

    const { toPay: totalToPay, paid: totalPaid, diff: totalDiff } = totals

    const diffColor = diffClassName(totalDiff)

    return (
        <table className='w-full text-xs text-left rtl:text-right text-gray-500 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 rounded-xl'>
                <tr>
                    <th scope='col' className='px-3 py-2'>
                        gasto
                    </th>
                    <th scope='col' className='px-3 py-2'>
                        a pagar
                    </th>
                    <th scope='col' className='px-3 py-2'>
                        pagado
                    </th>
                    <th scope='col' className='px-3 py-2'>
                        Dif
                    </th>
                </tr>
            </thead>
            <tbody>
                {expensesIds.map(expenseId => {
                    const expense = expenses[Number(expenseId)]
                    return (
                        <ExpenseRow
                            key={expenseId}
                            expenseId={expenseId}
                            expense={expense}
                            selectedPerson={selectedPerson}
                        />
                    )
                })}
            </tbody>
            <tfoot>
                <tr className='font-bold border-t-2  text-md'>
                    <th scope='row' className='px-3 py-3 uppercase '>
                        Total
                    </th>
                    <td className='px-3 py-3'>{formatedAmount(totalToPay)}</td>
                    <td className='px-3 py-3'>{formatedAmount(totalPaid)}</td>
                    <td className={`px-3 py-3 ${diffColor}`}>{formatedAmount(totalDiff)}</td>
                </tr>
            </tfoot>
        </table>
    )
}

const PersonsList = ({ persons, selectedPerson, hanleChangeSelectedPerson }) => {
    return (
        <ul id='persons' className='flex gap-2 mb-8'>
            {persons.map(person => (
                <li
                    key={person.id}
                    className={`bg-gray-100 px-3 py-1 rounded-md text-sm font-bold hover:bg-gray-200 cursor-pointer transition ${
                        person.id === selectedPerson &&
                        'border border-black bg-black text-white hover:bg-black '
                    }`}
                    onClick={() => hanleChangeSelectedPerson(person.id)}
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

    const [selectedPerson, setSetselectedPerson] = useState(persons[0].id)
    const { amountsPerPayment } = totals[selectedPerson]

    const hanleChangeSelectedPerson = personId => setSetselectedPerson(personId)

    return (
        <section id='list' className='px-10'>
            {/* Seleccion de persona para ver el detalle de esa persona */}
            <PersonsList
                persons={persons}
                selectedPerson={selectedPerson}
                hanleChangeSelectedPerson={hanleChangeSelectedPerson}
            />
            <SelectedPersonExpensesTable
                expenses={expenses}
                totals={amountsPerPayment}
                selectedPerson={selectedPerson}
            />
        </section>
    )
}
export default DetailPerPerson

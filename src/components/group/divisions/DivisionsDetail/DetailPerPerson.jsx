import { useState } from 'react'
import { useGroupStore } from '../../../../store/store'
import { formatedAmount } from '../../../../utils/utils'
import PersonChart from './PersonsChart'
import { InfoIcon } from '../../../icons/icons'
import Tooltip from '../../../common/Tooltip'
import PersonStats from './PersonStats'

const diffClassName = value => (value < 0 ? 'text-red-400 ' : value > 0 && 'text-green-400 ')

const ExpenseRow = ({ expense }) => {
    const { name, amounts, cantPayments, numberOfPayment } = expense

    const { toPay, paid, diff } = amounts

    const diffColor = diffClassName(diff)

    return (
        <tr className='bg-white border-b border-gray-50 hover:bg-gray-50 font-bold'>
            <th scope='row' className='flex flex-col items-start px-2 py-3 text-gray-900 whitespace-nowrap '>
                <span>{name} </span>
                <span className='py-0.5 text-gray-400 '>
                    cuota {numberOfPayment} de {cantPayments}
                </span>
                {toPay === 0 && (
                    <span className='bg-primary-200 px-2 py-0.5 rounded text-primary'>Excluido</span>
                )}
            </th>
            <td className='px-2 py-3'>{formatedAmount(toPay)}</td>
            <td className='px-2 py-3'>{formatedAmount(paid)}</td>
            <td className={`px-2 py-3 ${diffColor}`}>{formatedAmount(diff)}</td>
        </tr>
    )
}

const TableHeaderInfo = ({ onClick }) => {
    return (
        <button className='px-1 py-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700' onClick={onClick}>
            <InfoIcon width={'w-4'} height={'h-4'} />
        </button>
    )
}
const PersonExpensesTable = ({ expenses, totals }) => {
    const { toPay: totalToPay, paid: totalPaid, diff: totalDiff } = totals

    const diffColor = diffClassName(totalDiff)

    return (
        <table className='w-full text-xs text-left rtl:text-right text-gray-500 '>
            <thead className='text-xs text-gray-700  bg-gray-50 rounded-xl'>
                <tr>
                    <th scope='col' className='px-2 py-3 uppercase'>
                        gasto
                    </th>
                    <th scope='col' className='px-2 py-3'>
                        <span className='flex gap-2 items-center '>
                            <span className='uppercase'>a pagar</span>
                            <Tooltip
                                title={`Es el monto total acumulado que le corresponde pagar 
                                    a la persona por  todos los gastos 
                                    en los que está involucrado`}
                                component={TableHeaderInfo}
                                withButtons={false}
                                closable
                                position='left'
                            />
                        </span>
                    </th>
                    <th scope='col' className='px-2 py-3'>
                        <span className='flex gap-2 items-center'>
                            <span className='uppercase'>pagado</span>
                            <Tooltip
                                title={`Es el monto total acumulado que la persona ya pagó 
                                    por haber sido anotado como "pagador" de 1 o mas gastos`}
                                component={TableHeaderInfo}
                                withButtons={false}
                                closable
                                position='left'
                            />
                        </span>
                    </th>
                    <th scope='col' className='px-2 py-3'>
                        <span className='flex gap-2 items-center'>
                            <span className='uppercase'>dif</span>
                            <Tooltip
                                title={`Es la diferencia entre "A PAGAR" y "PAGADO".
                                Si el resultado es positivo, la persona debe "recibir" ese monto.
                                Si el resultado es negativo, La persona debe "dar" ese monto`}
                                component={TableHeaderInfo}
                                withButtons={false}
                                closable
                            />
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense => {
                    return <ExpenseRow key={expense.id} expense={expense} />
                })}
            </tbody>
            <tfoot>
                <tr className='font-bold border-t-2 text-md'>
                    <th scope='row' className='px-2 py-3 uppercase '>
                        Total
                    </th>
                    <td className='px-2 py-3'>{formatedAmount(totalToPay)}</td>
                    <td className='px-2 py-3'>{formatedAmount(totalPaid)}</td>
                    <td className={`px-2 py-3 ${diffColor}`}>{formatedAmount(totalDiff)}</td>
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
                    className={`px-3 py-1 rounded-md text-sm font-bold cursor-pointer transition
                        ${
                            person.id === selectedPerson.id
                                ? 'bg-black hover:bg-black border border-black text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }
                    }`}
                    onClick={() => hanleChangeSelectedPerson(person)}
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
    const hanleChangeSelectedPerson = personId => setSetselectedPerson(personId)

    const { amountsPerPayment } = totals[selectedPerson.id]

    // Recorrer los gastos. Por cada gasto obtener los totales de la persona seleccionada.
    const expensesNames = []
    const expensesDiff = []
    const expensesTableData = []

    const expensesIds = Object.keys(expenses)
    expensesIds.forEach(expenseId => {
        const expense = expenses[Number(expenseId)]
        const { expenseName, amountsPerPerson, amountPerpayment, cantPayments, numberOfPayment } = expense

        const currentPersonAmountInExpense = amountsPerPerson.find(
            ({ person }) => person.id === selectedPerson.id
        )
        const {
            amountsPerPayment: { toPay, paid, diff }
        } = currentPersonAmountInExpense

        expensesNames.push(expenseName)
        expensesDiff.push(diff)

        expensesTableData.push({
            id: expenseId,
            name: expenseName,
            cantPayments,
            numberOfPayment,
            amounts: { toPay, paid, diff }
        })
    })

    console.log('EXPENSES DIF: ', expensesDiff)

    return (
        <section id='list' className='px-3'>
            {/* Seleccion de persona para ver el detalle de esa persona */}
            <PersonsList
                persons={persons}
                selectedPerson={selectedPerson}
                hanleChangeSelectedPerson={hanleChangeSelectedPerson}
            />
            <PersonStats
                personName={selectedPerson.name}
                totalToPay={amountsPerPayment.toPay}
                totalDiff={amountsPerPayment.diff}
            />
            <PersonChart expensesNames={expensesNames} expensesDiff={expensesDiff} />
            <PersonExpensesTable expenses={expensesTableData} totals={amountsPerPayment} />
        </section>
    )
}
export default DetailPerPerson

import { formatedAmount } from '../../../../utils/utils'
import Tooltip from '../../../common/Tooltip'
import { InfoIcon } from '../../../icons/icons'

const diffClassName = value => (value < 0 ? 'text-red-400 ' : value > 0 && 'text-green-400 ')

const tableHeaders = [
    {
        title: 'gasto'
    },
    {
        title: 'a pagar',
        tooltipTitle:
            // 'Es el monto total acumulado que le corresponde pagar a la persona por  todos los gastos en los que está involucrado',
            'Es el monto que le corresponde pagar a la persona por estar involucrado en el gasto',
        tooltipPosition: 'left'
    },

    {
        title: 'pagado',
        tooltipTitle: 'Es el monto que la persona ya pagó, por haber sido anotado como "pagador" del gasto',
        tooltipPosition: 'left'
    },

    {
        title: 'dif',
        tooltipTitle:
            'Es la diferencia entre "PAGADO" y "A PAGAR". Si el resultado es positivo, la persona debe "recibir" ese monto. Si el resultado es negativo, la persona debe "dar" ese monto',
        tooltipPosition: 'right'
    }
]

const ExpenseRow = ({ expense }) => {
    const { name, amounts, cantPayments, numberOfPayment } = expense

    const { toPay, paid, diff } = amounts

    const diffColor = diffClassName(diff)

    return (
        <tr className='bg-white border-b border-gray-50 hover:bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-slate-600'>
            <th
                scope='row'
                className='flex flex-col items-start px-2 py-3.5 text-gray-900 whitespace-nowrap dark:text-gray-200 '
            >
                <span>{name} </span>
                {cantPayments && (
                    <span className='py-0.5 text-gray-400 '>
                        cuota {numberOfPayment} de {cantPayments}
                    </span>
                )}
                {toPay === 0 && (
                    <span className='bg-primary-200 px-2 py-0.5 rounded text-primary dark:bg-primary dark:text-white'>
                        Excluido
                    </span>
                )}
            </th>
            <td className='px-2 py-3'>{formatedAmount(toPay)}</td>
            <td className='px-2 py-3'>{formatedAmount(paid)}</td>
            <td className={`px-2 py-3 ${diffColor}`}>{formatedAmount(diff)}</td>
        </tr>
    )
}

export const TableHeaderInfo = ({ onClick }) => {
    return (
        <button className='px-1 py-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800' onClick={onClick}>
            <InfoIcon width={'w-4'} height={'h-4'} />
        </button>
    )
}

const TableHeader = ({ title, tooltipTitle, tooltipPosition }) => {
    return (
        <th scope='col' className='px-2 py-3'>
            <span className='flex gap-2 items-center '>
                <span className='uppercase'>{title}</span>
                {tooltipTitle && (
                    <Tooltip
                        title={tooltipTitle}
                        component={TableHeaderInfo}
                        withButtons={false}
                        position={tooltipPosition}
                        closable
                    />
                )}
            </span>
        </th>
    )
}

const PersonExpensesTable = ({ expenses, totals }) => {
    const { toPay: totalToPay, paid: totalPaid, diff: totalDiff } = totals

    const diffColor = diffClassName(totalDiff)

    return (
        <table className='w-full text-xs text-left rtl:text-right text-gray-500 dark:bg-gray-800 '>
            <thead className='text-xs text-gray-700 bg-gray-50 rounded-xl dark:bg-gray-800 dark:text-white'>
                <tr>
                    {tableHeaders.map(th => {
                        return <TableHeader key={th.title} {...th} />
                    })}
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense => {
                    return <ExpenseRow key={expense.id} expense={expense} />
                })}
            </tbody>
            <tfoot>
                <tr className='font-bold border-t-2 text-md dark:text-white dark:border-t-gray-600'>
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

export default PersonExpensesTable

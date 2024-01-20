import { formatedAmount } from '../../../../utils/utils'

const DetailPerPerson = ({ expensesInMonth }) => {
    const CURRENT_PERSON = {
        id: 64,
        name: 'Franco'
        // id: 65,
        // name: 'Juani'
        // id: 78,
        // name: 'juani'
    }
    const { expenses, totals } = expensesInMonth

    const expensesIds = Object.keys(expenses)

    const {
        amountsPerPayment: { toPay: totalToPay, paid: totalPaid, diff: totalDiff }
    } = totals[CURRENT_PERSON.id]

    return (
        <section id='list' className='justify-self-center px-10'>
            <h3>{CURRENT_PERSON.name}</h3>
            <div className='relative overflow-x-auto '>
                <table className='w-full text-xs text-left rtl:text-right text-gray-500 '>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 rounded-xl'>
                        <tr>
                            <th scope='col' className='  px-3 py-2'>
                                nombre Gasto
                            </th>
                            <th scope='col' className='  px-3 py-2'>
                                a pagar
                            </th>
                            <th scope='col' className='  px-3 py<-2'>
                                pagado
                            </th>
                            <th scope='col' className='  px-3 py-2'>
                                Dif
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {expensesIds.map(expenseId => {
                            const {
                                expenseName,
                                amountsPerPerson,
                                amountPerpayment,
                                cantPayments,
                                numberOfPayment
                            } = expensesInMonth.expenses[Number(expenseId)]

                            const currentPersonAmountInExpense = amountsPerPerson.find(
                                ({ person }) => person.id === CURRENT_PERSON.id
                            )

                            const {
                                amountsPerPayment: { toPay, paid, diff }
                            } = currentPersonAmountInExpense

                            const diffColor = diff < 0 ? 'text-red-500' : diff > 0 && 'text-green-500'

                            return (
                                <tr
                                    key={expenseId}
                                    className='bg-white border-b border-gray-50 hover:bg-gray-50 font-bold'
                                >
                                    <th
                                        scope='row'
                                        className='flex flex-col items-start px-3 py-3  text-gray-900 whitespace-nowrap '
                                    >
                                        <span>{expenseName} </span>
                                        <span className='py-0.5 text-gray-400 '>
                                            cuota {numberOfPayment} de {cantPayments}
                                        </span>
                                        {toPay === 0 && (
                                            <span className='bg-primary-200 px-2 py-0.1 text-primary'>
                                                Excluido
                                            </span>
                                        )}
                                    </th>
                                    <td className='px-3 py-3'>{formatedAmount(toPay)}</td>
                                    <td className='px-3 py-3'>{formatedAmount(paid)}</td>
                                    <td className={`px-3 py-3 ${diffColor}`}>{formatedAmount(diff)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr className='font-bold border-t-2  text-md'>
                            <th scope='row' className='px-3 py-3 '>
                                Total
                            </th>
                            <td className='px-3 py-3'>{formatedAmount(totalToPay)}</td>
                            <td className='px-3 py-3'>{formatedAmount(totalPaid)}</td>
                            <td className={`px-3 py-3 ${totalDiff < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {formatedAmount(totalDiff)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    )
}
export default DetailPerPerson

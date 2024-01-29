const giveClass = 'text-white bg-[#eb0a3a] rounded  font-bold  py-1 px-1 text-xs '
// const receiveClass = 'text-[#52c41a] bg-[#f6ffed] rounded py-1.5'
const receiveClass = 'text-white bg-[#00c28f] rounded  font-bold py-1 px-1 text-xs '

const DetailPerExpense = ({ expensesInMonth }) => {
    return (
        <section className='max-w-md m-auto mt-10'>
            <h4 className='m-0'>Gastos involucrados</h4>
            <ul className=''>
                {Object.keys(expensesInMonth.expenses).map(expenseId => {
                    const expenseData = expensesInMonth.expenses[expenseId]
                    const { expenseName, amountsPerPerson, numberOfPayment, cantPayments, amountPerpayment } =
                        expenseData

                    return (
                        <li className='py-5 my-2 border-b mx-auto' key={expenseId}>
                            <div className='flex gap-5 items-center justify-between'>
                                <div className='flex flex-col  my-6'>
                                    <h4 className='m-0  uppercase'>{expenseName}</h4>
                                    <h6 className='m-0 text-gray-500  uppercase'>
                                        cuota {numberOfPayment} de {cantPayments}
                                    </h6>
                                </div>
                                <div className='flex flex-col  my-6'>
                                    <h6 className='m-0 text-gray-500 uppercase'>Total cuota</h6>
                                    <h4 className='m-0  uppercase'>
                                        {amountPerpayment.toLocaleString('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS',
                                            minimumFractionDigits: 0
                                        })}
                                    </h4>
                                </div>
                            </div>
                            <div className='flex justify-center flex-wrap gap-2 text-sm '>
                                {amountsPerPerson.map((amountPerPerson, index) => {
                                    const {
                                        person: { id, name },
                                        amount
                                    } = amountPerPerson
                                    return (
                                        <div
                                            id={`person-${id}`}
                                            key={id}
                                            className='flex flex-col items-center gap-1 '
                                        >
                                            <h4 className='m-0 text-gray-500'>{name}</h4>
                                            <p
                                                className={
                                                    amount >= 0
                                                        ? amount > 0
                                                            ? giveClass
                                                            : null
                                                        : receiveClass
                                                }
                                            >
                                                {amount === 0
                                                    ? '-'
                                                    : amount.toLocaleString('es-AR', {
                                                          style: 'currency',
                                                          currency: 'ARS',
                                                          minimumFractionDigits: 0
                                                      })}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
export default DetailPerExpense

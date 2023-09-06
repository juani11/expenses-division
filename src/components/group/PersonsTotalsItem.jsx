import { currencyFormat, getRoundedPercentage } from '../../utils/utils'

const PersonTotalItem = ({ personTotal, nameOfPerson, totalAmountExpenses }) => {
    const { cantExpenses, amount } = personTotal

    const personRoundedAmountPercentage = getRoundedPercentage(amount, totalAmountExpenses)

    const cantExpensesText = `${cantExpenses} ${cantExpenses > 1 ? 'Gastos' : 'Gasto'}`

    return (
        <li className='hover:bg-gray-50 rounded-xl p-3 my-2 animate-fade dark:hover:bg-slate-600 '>
            <div className='flex justify-between items-center mb-2'>
                <h5 className='m-0 capitalize'>{nameOfPerson}</h5>
                <p className='font-bold'>{personRoundedAmountPercentage}%</p>
                <h6 className='m-0'>{cantExpensesText}</h6>
            </div>
            <div className='m-auto flex gap-2 items-center '>
                <div className={`bg-gray-200 rounded-lg h-4 w-full dark:bg-slate-700`}>
                    <div
                        className='bg-primary rounded-lg h-4'
                        style={{ width: `${personRoundedAmountPercentage}%` }}
                    ></div>
                </div>
            </div>
            <div className='flex justify-end'>
                <h3 className='m-0'>${currencyFormat(amount ?? 0)}</h3>
            </div>
        </li>
    )
}

export default PersonTotalItem

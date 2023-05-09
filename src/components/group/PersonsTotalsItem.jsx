import { currencyFormat, getPercentaje, roundedNumber } from '../../utils/utils'

const PersonTotalItem = ({ personTotal, nameOfPerson, totalAmountExpenses }) => {
    const { cant, amount } = personTotal

    let personRoundedAmountPercentaje = 0

    if (amount) {
        const personAmountPercentaje = getPercentaje(amount, totalAmountExpenses)
        personRoundedAmountPercentaje = roundedNumber(personAmountPercentaje)
    }

    return (
        <li className='hover:bg-gray-50 rounded-xl p-3 my-2 animate-fade '>
            <div className='flex justify-between items-center mb-2'>
                <h5 className='m-0'>{nameOfPerson}</h5>

                <p className=''>{personRoundedAmountPercentaje}%</p>
                <h6 className='m-0'>
                    {cant} {cant > 1 ? 'Gastos' : 'Gasto'}
                </h6>
            </div>
            <div className='m-auto flex gap-2 items-center '>
                <div className={`bg-gray-200 rounded-lg h-4 w-full`}>
                    <div
                        className='bg-primary rounded-lg h-4'
                        style={{ width: `${personRoundedAmountPercentaje}%` }}
                    ></div>
                </div>
            </div>
            <div className='flex justify-end'>
                <h3 className='m-0'>{currencyFormat(amount ?? 0)}</h3>
            </div>
        </li>
    )
}

export default PersonTotalItem

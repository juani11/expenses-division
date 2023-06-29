import { currencyFormat } from '../../utils/utils'

const MoneyAmount = ({ amount, className }) => {
    const formatedAmount = currencyFormat(amount)
    const amountSplit = formatedAmount.split('.')
    const [first, second, decimals] = amountSplit

    return decimals ? (
        <div className='relative max-w-fit bg-primary text-white  font-bold  rounded-lg text-center py-1.5 px-3'>
            <span className='absolute text-xs top-2'>$</span>
            <span className='px-3 text-sm '>{`${first}.${second},`}</span>
            <span className='absolute text-xs bottom-3 right-2'>{decimals}</span>
        </div>
    ) : (
        <div className={`relative max-w-fit text-center rounded-lg py-1.5 pl-3 ${className}`}>
            <span className='absolute text-xs top-2'>$</span>
            <span className='px-3 text-md '>{formatedAmount}</span>
        </div>
    )
}

export default MoneyAmount

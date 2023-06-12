import { currencyFormat } from '../../utils/utils'

const MoneyAmount = ({ value }) => {
    const amount = currencyFormat(value)
    const amountSplit = amount.split('.')
    const [first, second, decimals] = amountSplit

    return decimals ? (
        <div className='relative max-w-fit bg-primary text-white  font-bold  rounded-xl text-center py-2 px-3'>
            <span className='absolute text-xs top-3'>$</span>
            <span className='px-3 text-lg'>{`${first}.${second},`}</span>
            <span className='absolute text-xs top-4 right-3'>{decimals}</span>
        </div>
    ) : (
        <div className='relative max-w-fit bg-primary text-white font-bold rounded-xl text-center py-2 pl-3  '>
            <span className='absolute text-xs top-2'>$</span>
            <span className='px-3'>{amount}</span>
        </div>
    )
}

export default MoneyAmount

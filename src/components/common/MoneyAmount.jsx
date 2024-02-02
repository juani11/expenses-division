import { formatedAmount } from '../../utils/utils'

const MoneyAmount = ({ amount, className }) => {
    const formatedAm = formatedAmount(amount)
    return (
        <div className={`max-w-fit text-center rounded-md py-1 px-2.5 md:py-1.5 md:px-3 ${className}`}>
            <span className='text-sm md:text-base'>{formatedAm}</span>
        </div>
    )
}

export default MoneyAmount

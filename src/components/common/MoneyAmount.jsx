import { formatedAmount } from '../../utils/utils'

const MoneyAmount = ({ amount, className }) => {
    const formatedAm = formatedAmount(amount)
    return (
        <div className={` max-w-fit text-center rounded-lg py-1.5 px-3  ${className}`}>
            {/* <span className='absolute text-xs top-2'>$</span> */}
            <span className='text-md '>{formatedAm}</span>
        </div>
    )
}

export default MoneyAmount

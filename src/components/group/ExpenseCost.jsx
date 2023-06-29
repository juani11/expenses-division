import { currencyFormat } from '../../utils/utils'

const ExpenseCost = ({ cost }) => {
    return (
        // <h3 className='max-w-fit bg-primary rounded-2xl text-white text-center py-2 px-3 '>
        //     {/* <span className=''>$ </span> */}
        //     {`${currencyFormat(cost)}`}
        // </h3>

        <div className='relative max-w-fit bg-primary rounded text-white font-bold text-center py-1 pl-3 '>
            <span className='absolute text-xs top-2'>$</span>
            <span className='px-3 text-lg'>{`${currencyFormat(cost)}`}</span>
        </div>
    )
}

export default ExpenseCost

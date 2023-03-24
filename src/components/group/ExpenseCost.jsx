import { currencyFormat } from '../../utils/utils'

const ExpenseCost = ({ cost }) => {
    return (
        <h3 className='w-24 bg-primary rounded-2xl text-white text-center p-2 '>
            {`${currencyFormat(cost)}`}
        </h3>
    )
}

export default ExpenseCost

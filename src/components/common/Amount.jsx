import { currencyFormat, floorNumber } from '../../utils/utils'

const Amount = ({ amount, className }) => {
    const formatedAmount = currencyFormat(floorNumber(amount))

    return <span className={`${className} `}>{`$${formatedAmount}`}</span>
}

export default Amount

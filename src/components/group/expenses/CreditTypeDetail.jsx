import { MONTHS } from '../../../constants'
import { currentDate } from '../../../utils/utils'
import Tag from '../../common/Tag'

const CreditTypeDetail = ({ creditInfo }) => {
    const { cantPayments, initialYear, initialMonth } = creditInfo
    const paymentDate = currentDate(initialYear, initialMonth)
    const monthFrom = MONTHS[paymentDate.getMonth()].shortName
    const yearFrom = initialYear
    paymentDate.setMonth(paymentDate.getMonth() + cantPayments - 1)
    const monthTo = MONTHS[paymentDate.getMonth()].shortName
    const yearTo = paymentDate.getUTCFullYear()

    return (
        <div className='flex gap-2 items-center '>
            <Tag className='bg-gray-50' size='xs'>
                <h5>Crédito</h5>
            </Tag>
            <Tag className='bg-gray-50' size='xs'>
                <h5>{cantPayments === 1 ? `${cantPayments} cuota` : `${cantPayments} cuotas`}</h5>
            </Tag>
            <Tag className='bg-gray-50' size='xs'>
                <h5>
                    {' '}
                    {cantPayments === 1
                        ? `${monthFrom}. ${yearFrom}`
                        : `${monthFrom}. ${yearFrom} / ${monthTo}. ${yearTo}`}
                </h5>
            </Tag>
        </div>
    )
}

export default CreditTypeDetail

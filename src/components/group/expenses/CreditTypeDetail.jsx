import { MONTHS } from '../../../constants'
import { currentDate } from '../../../utils/utils'
import Tag from '../../common/Tag'
import { CreditCardIcon } from '../../icons/icons'

const CreditTypeDetail = ({ creditInfo }) => {
    const { cantPayments, initialYear, initialMonth } = creditInfo
    const paymentDate = currentDate(initialYear, initialMonth)
    const monthFrom = MONTHS[paymentDate.getMonth()].shortName
    const yearFrom = initialYear
    paymentDate.setMonth(paymentDate.getMonth() + cantPayments - 1)
    const monthTo = MONTHS[paymentDate.getMonth()].shortName
    const yearTo = paymentDate.getUTCFullYear()

    return (
        <div className='flex flex-wrap gap-2 items-center '>
            <Tag>
                <CreditCardIcon width='w-5' height='h-5' /> Crédito
            </Tag>
            <Tag> {cantPayments === 1 ? `${cantPayments} Cuota` : `${cantPayments} Cuotas`}</Tag>
            <Tag>
                <span className='capitalize'>
                    {cantPayments === 1
                        ? `${monthFrom} ${yearFrom}`
                        : `${monthFrom} ${yearFrom} / ${monthTo} ${yearTo}`}
                </span>
            </Tag>
        </div>
    )
}

export default CreditTypeDetail

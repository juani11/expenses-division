import Tag from '../../common/Tag'
import { CashIcon } from '../../icons/icons'

const CashTypeDetail = () => {
    return (
        <div className='flex gap-2 items-center  '>
            <Tag>
                <CashIcon width='w-5' height='h-5' /> Efectivo/Débito
            </Tag>
        </div>
    )
}

export default CashTypeDetail

import Tag from '../../common/Tag'
import CashSVG from '../../svg/CashSVG'

const CashTypeDetail = () => {
    return (
        <div className='flex gap-2 items-center  '>
            <Tag>
                <CashSVG width='w-5' height='h-5' /> Efectivo/Débito
            </Tag>
        </div>
    )
}

export default CashTypeDetail

import { BOTTOM } from '../../../constants'
import Amount from '../../common/Amount'
import Tag from '../../common/Tag'
import Tooltip from '../../common/Tooltip'
import { ArrowRightIcon, CheckIcon, TransferIcon } from '../../icons/icons'
import Button from '../../common/Button'

const Draft = ({ onClick }) => {
    return (
        <Button size='icon' color='primary' variant='subtle' onClick={onClick}>
            <TransferIcon className={'w-4 h-4'} />
        </Button>
    )
}

const DivisionListItem = ({ division }) => {
    const { personaFrom, personaTo, cantidad, paid = false } = division
    return (
        <li className='flex gap-8 items-center '>
            <div className='flex flex-col items-start'>
                <h4 className='text-sm font-semibold'>{personaFrom.name}</h4>
                <div className='flex items-center gap-2 '>
                    <ArrowRightIcon className={'w-5 h-5 text-gray-700 bg-gray-100 p-1 rounded '} />
                    <h4 className='text-sm font-medium'>{personaTo.name}</h4>
                </div>
            </div>
            <Amount amount={cantidad} className='text-sm font-bold ml-auto' />
            {paid ? (
                <Tag size='xs' className='bg-[#E3FCF5] text-[#14b886]'>
                    <CheckIcon className='w-3 h-3 ' /> Pagado
                </Tag>
            ) : (
                <Tooltip
                    title={`¿Marcar division como pagada ?`}
                    callbackOnOk={null}
                    component={Draft}
                    position={BOTTOM}
                />
            )}
        </li>
    )
}

export default DivisionListItem

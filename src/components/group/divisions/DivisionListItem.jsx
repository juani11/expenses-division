import MoneyAmount from '../../common/MoneyAmount'
import { ArrowIcon } from '../../icons/icons'

const DivisionListItem = ({ division }) => {
    const { personaFrom, personaTo, cantidad } = division
    return (
        <li className='rounded mb-3 hover:bg-gray-50 p-4 dark:hover:bg-slate-600'>
            <div className='flex gap-6 items-center '>
                <div className='flex gap-5 items-center'>
                    <div className='flex flex-col gap-1'>
                        <h5 className='m-0 capitalize w-20 '>{personaFrom.name}</h5>
                        <div className='flex items-center gap-1'>
                            <ArrowIcon />
                            <h5 className='m-0 capitalize ml-auto text-gray-400'>{personaTo.name}</h5>
                        </div>
                    </div>
                </div>
                <div className='ml-auto'>
                    <MoneyAmount amount={cantidad} className='bg-primary  text-white font-bold' />
                </div>
            </div>
        </li>
    )
}

export default DivisionListItem

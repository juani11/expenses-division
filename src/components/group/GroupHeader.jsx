import { useGroupStore } from '../../store/store'
import { currencyFormat } from '../../utils/utils'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import EditSVG from '../svg/EditSVG'
import MoneySVG from '../svg/MoneySVG'
import PeopleSelfieSVG from '../svg/PeopleSelfieSVG'
import GroupHeaderLoading from './GroupHeaderLoading'

const GroupHeaderInfo = ({ groupName = 'viaje brasil', cantPersons = 1 }) => {
    const totalAmountExpenses = useGroupStore(state => state.totalAmountExpenses)

    return (
        <>
            <div className='flex items-center w-96 justify-center gap-5 mt-6'>
                <Avatar>{groupName?.charAt(0)}</Avatar>
                <div className='flex flex-col items-start gap-2'>
                    <h2 className=''>{groupName}</h2>
                </div>
            </div>

            <div className='flex items-center justify-evenly gap-10 mt-6 w-96'>
                <div className='flex flex-col items-center'>
                    <h4 className='m-0'>Total Gastos</h4>
                    <div className='flex justify-start items-center'>
                        <div className='shrink-0'>
                            <MoneySVG width={80} height={50} />
                        </div>
                        <h1>$ {currencyFormat(totalAmountExpenses())}</h1>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <h4 className='m-0'>Personas </h4>{' '}
                    <div className='flex justify-between items-center gap-4 '>
                        <h1 className='grow'>{cantPersons}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

const GroupHeaderImage = () => {
    return (
        <div className='absolute right-0 '>
            <PeopleSelfieSVG width={350} height={300} />
        </div>
    )
}
const GroupHeader = props => {
    const loading = useGroupStore(state => state.loading)

    return (
        <div className='grid grid-cols-3 gap-10 '>
            <div className='col-span-2 row-span-1 flex  relative rounded-3xl'>
                <div className='flex flex-col '>
                    {loading ? <GroupHeaderLoading /> : <GroupHeaderInfo {...props} />}
                </div>
                {/* <GroupHeaderImage /> */}
            </div>
        </div>
    )
}

export default GroupHeader

import { useGroupStore } from '../../store/store'
import { currencyFormat } from '../../utils/utils'
import Avatar from '../common/Avatar'
import MoneySVG from '../svg/MoneySVG'
import PeopleSelfieSVG from '../svg/PeopleSelfieSVG'

const GroupHeader = ({ groupName, cantPersons }) => {
    const totalAmountExpenses = useGroupStore(state => state.totalAmountExpenses)

    return (
        <div className='grid grid-cols-3 gap-10 '>
            <div className='col-span-2 row-span-1 flex  relative rounded-3xl'>
                <div className='flex flex-col '>
                    <div className='flex items-center w-96 justify-center gap-5 mt-6'>
                        <Avatar>{groupName.charAt(0)}</Avatar>
                        <h2>{groupName}</h2>
                    </div>

                    <div className='flex items-center justify-evenly gap-10 mt-6 w-96'>
                        <div className='flex flex-col items-center'>
                            <h4 className='m-0'>Total Gastos</h4>
                            <div className='flex justify-start items-center'>
                                <div className='shrink-0'>
                                    <MoneySVG width={80} height={50} />
                                </div>
                                <h1>{currencyFormat(totalAmountExpenses())}</h1>
                            </div>
                        </div>

                        <div className='flex flex-col items-center'>
                            <h4 className='m-0'>Personas </h4>{' '}
                            <div className='flex justify-between items-center gap-4 '>
                                <h1 className='grow'>{cantPersons}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute right-0 '>
                    <PeopleSelfieSVG width={350} height={300} />
                </div>
            </div>
        </div>
    )
}

export default GroupHeader

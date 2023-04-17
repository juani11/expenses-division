import DivisionsList from '../components/group/DivisionsList'
import EmptyGroup from '../components/group/EmptyGroup'
import Persons from '../components/group/Persons'
import TotalsList from '../components/group/TotalsList'
import MoneySVG from '../components/svg/MoneySVG'
import PeopleSelfieSVG from '../components/svg/PeopleSelfieSVG'
import { useGroupStore } from '../store/store'
import { currencyFormat } from '../utils/utils'
import Avatar from './../components/common/Avatar'
import Expenses from './../components/group/Expenses'

const Group = () => {
    const group = useGroupStore(state => state.info)
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)
    const totalAmountExpenses = useGroupStore(state => state.totalAmountExpenses)

    return (
        <div className='h-screen'>
            {/* // GROUP HEADER INFORMATION */}
            <section className='flex items-center  gap-96 font-primary'>
                <div className='flex flex-col '>
                    <div className='flex items-center w-96 justify-center gap-5 mt-6'>
                        <Avatar>{group.name.charAt(0)}</Avatar>
                        <h2>{group.name}</h2>
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
                                <h1 className='grow'>{persons.length}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {expenses.length > 0 && <PeopleSelfieSVG width={350} height={400} />}
            </section>

            {/* // GROUP INFORMATION */}
            <section className='font-primary w-full'>
                {expenses.length === 0 ? (
                    <div className='flex justify-center'>
                        <EmptyGroup />
                    </div>
                ) : (
                    <div className='grid grid-cols-2 gap-5 bg-gray-50 md:p-20 rounded-l-[150px] '>
                        <div className=''>
                            <Persons />
                            <DivisionsList />
                        </div>
                        <div className='w-[500px] justify-self-center'>
                            <Expenses />
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Group

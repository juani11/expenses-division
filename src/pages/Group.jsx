import DivisionsList from '../components/group/DivisionsList'
import EmptyGroup from '../components/group/EmptyGroup'
import TotalsList from '../components/group/TotalsList'
import MoneySVG from '../components/svg/MoneySVG'
import PeopleSelfieSVG from '../components/svg/PeopleSelfieSVG'
import { useGroupStore } from '../store/store'
import { currencyFormat } from '../utils/utils'
import Avatar from './../components/common/Avatar'
import Expenses from './../components/group/Expenses'
const groupDataGrid = [
    {
        classNames: 'col-span-5 md:col-span-1 lg:row-span-3',
        component: Expenses
    },
    {
        classNames: 'col-span-5 md:col-span-1',
        component: DivisionsList
    },
    {
        classNames: 'col-span-5 md:col-span-1 lg:col-span-1 col-start-1 ',
        component: TotalsList
    }
]

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
            <section className='font-primary '>
                {expenses.length === 0 ? (
                    <div className='flex justify-center'>
                        <EmptyGroup />
                    </div>
                ) : (
                    <div className='grid grid-cols-2 bg-gray-50 md:px-20'>
                        {groupDataGrid.map(({ classNames, component: Component }, index) => (
                            <div key={index} className={`${classNames} p-10 relative'`}>
                                <Component />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Group

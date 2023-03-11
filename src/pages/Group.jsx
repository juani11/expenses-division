import EmptyGroup from '../components/group/EmptyGroup'
import MoneySVG from '../components/svg/MoneySVG'
import ExpensesList from './../components/group/ExpensesList'
import Avatar from './../components/common/Avatar'
import DivisionsList from '../components/group/DivisionsList'
import TotalsList from '../components/group/TotalsList'
import PeopleSelfieSVG from '../components/svg/PeopleSelfieSVG'
import { currencyFormat } from '../utils/utils'

const group = {
    id: '1',
    name: 'Juntada ATR',
    totalExpenses: 11355,
    peoples: ['Franco', 'Juani', 'Juli'],
    expenses: [
        {
            id: '1',
            name: 'fernet',
            amount: 4300,
            person: 'Franco'
        },
        {
            id: '2',
            name: 'gaseosas',
            amount: 1350,
            person: 'Juani'
        },
        {
            id: '3',
            name: 'patys y pan',
            amount: 5705,
            person: 'Juli'
        },
        {
            id: '4',
            name: 'fernet',
            amount: 700,
            person: 'Pedro'
        },
        {
            id: '5',
            name: 'gaseosas',
            amount: 2600,
            person: 'Javier'
        },
        {
            id: '6',
            name: 'patys y pan',
            amount: 3210,
            person: 'Laura'
        }
    ]
}

const groupDataGrid = [
    {
        classNames: 'col-span-5 md:col-span-1 lg:row-span-3',
        component: ExpensesList,
        props: { expenses: group.expenses }
    },
    {
        classNames: 'col-span-5 md:col-span-1',
        component: DivisionsList,
        props: null
    },
    {
        classNames: 'col-span-5 md:col-span-1 lg:col-span-1 col-start-1 ',
        component: TotalsList,
        props: null
    }
]

const Group = () => {
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
                                <h1>{currencyFormat(group.totalExpenses)}</h1>
                            </div>
                        </div>

                        <div className='flex flex-col items-center'>
                            <h4 className='m-0'>
                                Personas{' '}
                                {/* <span>
                                    <button className='bg-secondary p-1 w-8 hover:bg-gray-600 text-white rounded-md'>
                                        +
                                    </button>
                                </span>{' '} */}
                            </h4>{' '}
                            <div className='flex justify-between items-center gap-4 '>
                                {/* <div className='shrink-0'>
                            <AvatarSVG width={80} height={50} />
                        </div> */}
                                <h1 className='grow'>{group.peoples.length}</h1>
                                {/* <div className='flex flex-wrap'>
                                    {group.peoples.map((p, index) => (
                                        <span
                                            key={index}
                                            className='border bg-primary text-white font-bold border-white rounded-full h-9 w-9 flex justify-center items-center'
                                        >
                                            {p.charAt(0)}
                                        </span>
                                    ))}
                                    <button className='bg-secondary p-1 w-8 hover:bg-gray-600 text-white rounded-md ml-5'>
                                        +
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <section className='flex flex-col w-96 gap-4 rounded-md p-5 shadow-lg'>
                    <div>
                        <h2 className='m-0'>Personas</h2>
                        <p>Añade nuevas personas para dividir gastos</p>
                    </div>
                    <div className='flex items-center gap-10 flex-wrap'>
                        <div className='flex items-center  '>
                            {group.peoples.map((p, index) => (
                                <span
                                    key={index}
                                    className='border bg-primary text-white font-bold border-white rounded-full h-9 w-9 flex justify-center items-center'
                                >
                                    {p.charAt(0)}
                                </span>
                            ))}
                            <button className='bg-secondary p-1 w-8 hover:bg-gray-600 text-white rounded-md ml-5'>
                                +
                            </button>
                        </div>
                    </div>
                </section> */}

                <PeopleSelfieSVG width={350} height={400} />
            </section>

            {/* // GROUP INFORMATION */}
            <section className='font-primary '>
                {group.expenses.length === 0 ? (
                    <div className='flex justify-center'>
                        <EmptyGroup />
                    </div>
                ) : (
                    <div className='grid grid-cols-2 bg-gray-50 md:px-20'>
                        {groupDataGrid.map(({ classNames, component: Component, props }, index) => (
                            <div key={index} className={`${classNames} p-10 relative'`}>
                                <Component {...props} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Group

import { expensesPerPerson } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import { currencyFormat } from '../../utils/utils'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import AvatarSVG from '../svg/AvatarSVG'
import AddExpense from './AddExpense'
import UserSVG from './../svg/UserSVG'

const getPercentaje = (total, value) => {}

const Persons = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)
    const totalAmountExpenses = useGroupStore(state => state.totalAmountExpenses)

    const totales = expensesPerPerson(expenses)

    console.log({ totales })
    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Personas</h3>
                <Button onClick={null}>añadir persona</Button>
            </div>
            {/* <div className='flex justify-evenly shadow-lg bg-white p-2 rounded-xl mb-3'>
                <button className='rounded-lg hover:bg-gray-50 bg-gray-100 p-2'>Listado de personas</button>
                <button className='rounded-lg hover:bg-gray-50 bg-gray-100 p-2'>Estadisticas</button>
            </div> */}
            <div className='mb-2'>
                <div className='sm:hidden'>
                    <label htmlFor='tabs' className='sr-only'>
                        Select your country
                    </label>
                    <select
                        id='tabs'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                        <option>France</option>
                        <option>Germany</option>
                    </select>
                </div>
                <ul
                    className='hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex'
                    //  dark:divide-gray-700 dark:text-gray-400'
                >
                    <li className='w-full'>
                        <a
                            href='#'
                            className='inline-block w-full p-4 text-gray-900 bg-white rounded-l-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 active focus:outline-none'
                            //   dark:bg-gray-700 dark:text-white'
                            aria-current='page'
                        >
                            Listado
                        </a>
                    </li>
                    <li className='w-full'>
                        <a
                            href='#'
                            className='inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none '
                        >
                            Inclusiones
                        </a>
                    </li>

                    <li className='w-full'>
                        <a
                            href='#'
                            className='inline-block w-full p-4 bg-gray-100 rounded-r-lg  hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300'
                            //  dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
                        >
                            Totales
                        </a>
                    </li>
                </ul>
            </div>

            <div className='shadow-lg bg-white py-5 px-2 rounded-xl '>
                <ul className=''>
                    {persons.map((person, index) => {
                        const personPercentaje = (totales[person.id].amount * 100) / totalAmountExpenses()
                        const roundedPercentaje = Math.round(personPercentaje)
                        console.log(roundedPercentaje)
                        const stilo = {
                            width: `${roundedPercentaje}%`
                        }
                        return (
                            <li key={index} className='grid hover:bg-gray-50 rounded-xl  p-3 my-2 '>
                                <div className='col-span-2 flex  items-center gap-10'>
                                    <div className='flex gap-1 items-center w-20'>
                                        <AvatarSVG width={40} height={40} fillColor={`fill-black`} />
                                        {/* <div className='flex flex-col'> */}
                                        <h5 className='m-0'>{person.name}</h5>
                                    </div>
                                    {/* <p>Cantidad: {totales[person.id].cant}</p>
                                    <p>Total: {currencyFormat(totales[person.id].amount)}</p> */}
                                    {/* </div> */}
                                    {/* <div className='flex flex-col justify-center items-center'>
                                        <h3 className='m-0'> {totales[person.id].cant}</h3>
                                        <p>GASTO</p>
                                    </div> */}
                                    <div className='flex gap-2 w-52 items-center'>
                                        <div className={`bg-gray-200 rounded-lg h-4 w-48`}>
                                            <div className='bg-primary  rounded-lg h-4' style={stilo}></div>
                                            {/* {(totales[person.id].amount * 100) / totalAmountExpenses()} */}
                                        </div>
                                        <p className='grow-0'>{roundedPercentaje}%</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <h3 className='m-0'>{currencyFormat(totales[person.id].amount)}</h3>
                                        {/* <p>Total gastado</p> */}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Persons

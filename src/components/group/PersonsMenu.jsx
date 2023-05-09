const menuOptionClassName = 'inline-block w-full p-4 hover:bg-gray-50  focus:outline-none'

export const PERSONS_LIST = 'listado'
export const PERSONS_TOTALS = 'totales'

const PersonsMenu = ({ menuOptionSelected, changeMenuOption }) => {
    const isActive = menuOption => menuOptionSelected === menuOption

    const showPersonsList = () => changeMenuOption(PERSONS_LIST)
    const showPersonsTotals = () => changeMenuOption(PERSONS_TOTALS)

    return (
        <div className='mb-2'>
            <div className='sm:hidden'>
                <label htmlFor='tabs' className='sr-only'>
                    Select your country
                </label>
                <select
                    id='tabs'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                >
                    <option>Listado</option>
                    <option>Totales</option>
                </select>
            </div>
            <ul className='hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex'>
                <li className='w-full'>
                    <a
                        className={`${menuOptionClassName} rounded-l-lg ${
                            isActive(PERSONS_LIST) ? 'bg-gray-50' : 'bg-white'
                        }`}
                        onClick={showPersonsList}
                    >
                        Listado
                    </a>
                </li>
                <li className='w-full'>
                    <a
                        className={`${menuOptionClassName} rounded-r-lg  ${
                            isActive(PERSONS_TOTALS) ? 'bg-gray-50' : 'bg-white'
                        }`}
                        onClick={showPersonsTotals}
                    >
                        Totales
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default PersonsMenu

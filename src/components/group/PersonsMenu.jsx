const menuOptionClassName = 'inline-block w-full p-4 hover:bg-gray-50  focus:outline-none'

const PersonsMenu = ({ menuOptionSelected, handleClick }) => {
    const isActive = menuOption => menuOptionSelected === menuOption

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
                        href='#'
                        className={`${menuOptionClassName} rounded-l-lg ${
                            isActive('listado') ? 'bg-gray-50' : 'bg-white'
                        }`}
                        aria-current='page'
                        onClick={() => handleClick('listado')}
                    >
                        Listado
                    </a>
                </li>
                <li className='w-full'>
                    <a
                        href='#'
                        className={`${menuOptionClassName} rounded-r-lg  ${
                            isActive('totales') ? 'bg-gray-50' : 'bg-white'
                        }`}
                        onClick={() => handleClick('totales')}
                    >
                        Totales
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default PersonsMenu

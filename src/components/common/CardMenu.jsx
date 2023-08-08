const menuOptionClassName =
    'cursor-pointer capitalize inline-block w-full p-4 hover:bg-gray-50 focus:outline-none hover:dark:bg-slate-500'

const MenuItem = ({ isActive, onClick, name }) => {
    return (
        <li className='w-full'>
            <a
                className={`${menuOptionClassName} 
                ${isActive(name) ? 'bg-gray-50 dark:bg-slate-600' : 'bg-white dark:bg-slate-700'}`}
                onClick={() => onClick(name)}
            >
                {name}
            </a>
        </li>
    )
}

const CardMenu = ({ menuItems, menuItemSelected, changeMenuOption }) => {
    const isActive = menuOption => menuItemSelected === menuOption
    return (
        <div className='mb-2'>
            <ul className='flex text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded shadow dark:text-white dark:divide-slate-700'>
                {menuItems.map(menuItem => {
                    return (
                        <MenuItem
                            name={menuItem}
                            key={menuItem}
                            isActive={isActive}
                            onClick={changeMenuOption}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default CardMenu

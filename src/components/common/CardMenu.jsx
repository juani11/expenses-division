// import { useState, useEffect, useRef } from 'react'

const menuOptionClassName =
    'cursor-pointer capitalize inline-block w-full p-4 hover:bg-gray-50 focus:outline-none hover:dark:bg-slate-500 '

const MenuItem = ({ isActive, onClick, name }) => {
    return (
        <li className='w-full  '>
            <a
                className={`${menuOptionClassName} 
                ${isActive(name) ? 'bg-gray-50 dark:bg-slate-600 ' : 'bg-white dark:bg-slate-700'}`}
                onClick={() => onClick(name)}
            >
                {/* <span className={`relative z-20 ${isActive(name) && 'text-white'} `}> {name}</span> */}
                {name}
            </a>
        </li>
    )
}

const CardMenu = ({ menuItems, menuItemSelected, changeMenuOption }) => {
    const isActive = menuOption => menuItemSelected === menuOption
    // const [marginInlineStrt, setMarginInlineStrt] = useState('ms-0')
    // const firstRender = useRef(true)

    // useEffect(() => {
    //     if (!firstRender.current) {
    //         return setMarginInlineStrt(prevState => {
    //             return prevState === 'ms-0' ? 'ms-50' : 'ms-0'
    //         })
    //     }
    //     firstRender.current = false
    // }, [menuItemSelected])

    return (
        <div className='mb-2 relative '>
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
            {/* <div
                className={`bg-primary-300 absolute ${marginInlineStrt} top-0 z-10 h-full transition-all duration-300 w-1/2  rounded`}
            ></div> */}
        </div>
    )
}

export default CardMenu

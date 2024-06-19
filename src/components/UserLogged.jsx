import { useState } from 'react'
import { useLocation } from 'wouter'
import { ChevronDownIcon, ChevronUpIcon, GroupsIcon, LogoutIcon, UserIcon } from './icons/icons'

const UserLogged = ({ userName, signOut }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [location, setLocation] = useLocation()

    const navigateToProfile = () => {
        setIsOpen(false)
        setLocation('/profile')
    }

    return (
        <div className='relative text-sm z-10'>
            <button
                className=' flex items-center gap-4 border border-gray-100 px-2 py-1.5 hover:bg-gray-50 dark:bg-slate-800 dark:border-0 cursor-pointer rounded-lg'
                onClick={() => setIsOpen(!isOpen)}
            >
                <UserIcon fillColor={'text-gray-500'} />
                <span>{userName}</span>
                <span>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
            </button>
            {isOpen && (
                <ul className='absolute top-10 left-0 w-full uppercase border rounded border-primary-300 bg-white py-2 max-h-80 overflow-y-auto dark:bg-slate-700 dark:border-slate-600 text-xs'>
                    <li className='cursor-pointer select-none py-1 px-3 bg-white hover:bg-primary-300 hover:text-white dark:bg-slate-700 dark:hover:bg-slate-800 '>
                        <div className='m-1 flex items-center gap-2' onClick={navigateToProfile}>
                            <GroupsIcon /> Mis grupos
                        </div>
                    </li>
                    <li className='cursor-pointer select-none py-1 px-3 bg-white hover:bg-primary-300 hover:text-white dark:bg-slate-700 dark:hover:bg-slate-800 '>
                        <div className='m-1 flex items-center gap-2' onClick={signOut}>
                            <LogoutIcon /> cerrar sesión
                        </div>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default UserLogged

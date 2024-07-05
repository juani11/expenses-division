import useTheme, { LIGHT } from '../hooks/useTheme'
import UserLogged from './UserLogged'
import { MoonIcon, SunIcon, UserIcon } from './icons/icons'

const ThemeSelector = () => {
    const { theme, handleChangeTheme } = useTheme()

    return (
        // <div className='absolute right-0 p-5 md:right-24 md:top-4 flex items-center gap-10'>
        <button
            onClick={handleChangeTheme}
            className={`rounded-full text-white bg-gray-100 border-gray p-2 dark:bg-slate-800 dark:border-slate-700`}
        >
            {theme === LIGHT ? <MoonIcon /> : <SunIcon />}
        </button>
        // </div>
    )
}

export default ThemeSelector

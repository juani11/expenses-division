import useTheme, { LIGHT } from '../hooks/useTheme'
import { MoonIcon, SunIcon } from './icons/icons'

const ThemeSelector = () => {
    const { theme, handleChangeTheme } = useTheme()

    return (
        <div className='absolute right-0 p-5 md:right-24 md:top-4'>
            <button
                onClick={handleChangeTheme}
                className={`rounded-full text-white bg-gray-100 border-gray p-2 dark:bg-slate-800 dark:border-slate-700`}
            >
                {theme === LIGHT ? <MoonIcon /> : <SunIcon />}
            </button>
        </div>
    )
}

export default ThemeSelector

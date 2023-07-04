import useTheme, { LIGHT } from '../hooks/useTheme'
import MoonSVG from './svg/MoonSVG'
import SunSVG from './svg/SunSVG'

const ThemeSelector = () => {
    const { theme, handleChangeTheme } = useTheme()

    return (
        <div className='flex justify-end md:absolute md:right-24 md:top-4 p-5'>
            <button
                onClick={handleChangeTheme}
                className={`rounded-full text-white bg-gray-100 border-gray p-2 dark:bg-slate-800 dark:border-slate-700`}
            >
                {theme === LIGHT ? <MoonSVG /> : <SunSVG />}
            </button>
        </div>
    )
}

export default ThemeSelector

import { useState, useEffect } from 'react'

export const DARK = 'dark'
export const LIGHT = 'light'

const themeInitialState = () => ('theme' in localStorage && localStorage.theme === DARK ? DARK : LIGHT)

const useTheme = () => {
    const [theme, setTheme] = useState(themeInitialState)

    const handleChangeTheme = () => {
        setTheme(prevState => {
            if (prevState === DARK) {
                document.documentElement.classList.remove(DARK)
                localStorage.setItem('theme', LIGHT)
                return LIGHT
            }
            document.documentElement.classList.add(DARK)
            localStorage.setItem('theme', DARK)
            return DARK
        })
    }

    useEffect(() => {
        theme === DARK && document.documentElement.classList.add(DARK)
    }, [])

    return {
        theme,
        handleChangeTheme
    }
}

export default useTheme

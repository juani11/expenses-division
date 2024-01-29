import { useEffect, useRef } from 'react'

const useClickOutsideElement = onClickOutside => {
    const elemRef = useRef(null)

    const handleClickOutside = e => {
        if (elemRef.current && !elemRef.current.contains(e.target)) {
            onClickOutside()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return {
        elemRef,
        handleClickOutside
    }
}
export default useClickOutsideElement

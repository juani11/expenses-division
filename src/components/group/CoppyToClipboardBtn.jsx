import { useEffect, useState } from 'react'
import { CoppyToClipboardIcon } from '../icons/icons'

const CoppyToClipboardBtn = () => {
    const [coppy, setCoppy] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false)

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href)
        setCoppy(true)
    }

    useEffect(() => {
        if (coppy) {
            setTimeout(() => {
                setCoppy(false)
            }, 2000)
        }
    }, [coppy])

    const showTooltip = () => setTooltipVisible(true)
    const hideTooltip = () => setTooltipVisible(false)

    return (
        <button
            className='relative text-xs gap-1 text-gray-900  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white rounded py-1.5 px-1.5 inline-flex items-center justify-center bg-white border-gray-200 border'
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onClick={handleClick}
        >
            <div
                className={` ${
                    tooltipVisible ? 'opacity-1' : 'opacity-0'
                } absolute -top-8 right-0 bg-black text-white font-bold px-2 py-0.5 rounded`}
            >
                <span className='text-sm'>{coppy ? 'Copiado!' : 'Copiar Link'}</span>
            </div>

            <span>
                <CoppyToClipboardIcon />
            </span>
            <span>Copiar Link del grupo</span>
        </button>
    )
}

export default CoppyToClipboardBtn

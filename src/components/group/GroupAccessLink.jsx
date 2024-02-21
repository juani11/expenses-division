import { useEffect, useState } from 'react'
import { CoppyClipboardIcon, LinkIcon } from '../icons/icons'

const GroupAccessLink = () => {
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
        <div
            className={`relative ${
                tooltipVisible ? 'overflow-y-visible' : 'overflow-y-hidden'
            } rounded bg-gray-50 py-1 px-3`}
        >
            <div
                className={` ${
                    tooltipVisible ? 'opacity-1' : 'opacity-0'
                } absolute -top-8 right-0 bg-black text-white font-bold px-2 py-0.5 rounded`}
            >
                <span className='text-sm'>{coppy ? 'Copiado!' : 'Copiar Link'}</span>
            </div>
            {/* <div
                className={` ${
                    tooltipVisible ? 'translate-y-0 ' : ' -translate-y-2'
                } absolute -top-6 right-0 transition-transform bg-secondary text-white font-bold px-2  rounded`}
            >
                <span className='text-sm '>{coppy ? 'Copiado!' : 'Copiar Link'}</span>
            </div> */}
            <div className='flex items-center gap-2'>
                <LinkIcon />
                <span>Link del grupo</span>
                <button
                    className='text-gray-900 dark:text-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-1.5 px-2 inline-flex items-center justify-center bg-white border-gray-200 border'
                    onClick={handleClick}
                    onMouseEnter={showTooltip}
                    onMouseLeave={hideTooltip}
                >
                    {coppy ? (
                        <span>
                            <CoppyClipboardIcon />
                        </span>
                    ) : (
                        <span>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'
                                />
                            </svg>
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default GroupAccessLink

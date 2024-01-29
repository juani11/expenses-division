import { useState } from 'react'
import { CloseIcon, TooltipTriangleIcon } from '../icons/icons'
import Button from './Button'

const Tooltip = ({
    title,
    callbackOnOk,
    component: Component,
    withButtons = true,
    closable,
    position = 'right'
}) => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClick = () => setShow(!show)
    const hideTooltip = () => setShow(false)

    const onOk = async () => {
        setLoading(true)
        try {
            await callbackOnOk()
            hideTooltip()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const positionClassnames = position === 'right' ? 'right-0  ' : 'ml-4'

    return (
        <a
            tabIndex='0'
            role='link'
            aria-label='tooltip 1'
            className='focus:outline-none focus:ring-gray-300 rounded-full relative flex justify-center items-center'
        >
            <Component onClick={handleClick} />

            {show && (
                <div
                    className={`z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out shadow-xl bg-white p-4 rounded dark:bg-slate-800 dark:border-slate-600 dark:border  ${positionClassnames}`}
                >
                    <TooltipTriangleIcon />
                    <p className='text-md font-bold text-gray-800 dark:text-white leading-5 pt-4 '>{title}</p>
                    {withButtons && (
                        <div className='flex justify-between mt-4'>
                            <Button size='sm' onClick={hideTooltip}>
                                Cancelar
                            </Button>
                            <Button size='sm' onClick={onOk} loading={loading} color='primary'>
                                Ok
                            </Button>
                        </div>
                    )}
                    {closable && (
                        <button
                            className='absolute top-1 right-2 px-1 py-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700'
                            onClick={hideTooltip}
                        >
                            <CloseIcon color='black' width={18} height={18} />
                        </button>
                    )}
                </div>
            )}
        </a>
    )
}

export default Tooltip

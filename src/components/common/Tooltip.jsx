import { useState } from 'react'
import { CloseIcon, TooltipTriangleIcon } from '../icons/icons'
import Button from './Button'
import { BOTTOM, RIGHT, TOP } from '../../constants'

const Tooltip = ({
    title,
    callbackOnOk,
    component: Component,
    withButtons = true,
    closable,
    position = RIGHT
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

    const positionClassnames =
        position === RIGHT
            ? 'left-10'
            : position === BOTTOM
            ? 'top-10'
            : position === TOP
            ? 'bottom-10'
            : 'right-10'

    const showClassname = show ? ' scale-100 opacity-1 z-10' : 'scale-90 opacity-0 z-0'

    const tooltipTriangleIconClassname =
        position === RIGHT
            ? '-left-2 bottom-0 top-0 my-auto '
            : position === BOTTOM
            ? '-top-2 left-0 right-0 mx-auto rotate-90 '
            : position === TOP
            ? '-bottom-2 left-0 right-0 mx-auto -rotate-90'
            : '-right-2 bottom-0 top-0 my-auto -rotate-180 '

    return (
        <a
            tabIndex='0'
            role='link'
            aria-label='tooltip 1'
            className='focus:outline-none righ focus:ring-gray-300 rounded-full relative w-max flex justify-center items-center'
        >
            <Component onClick={handleClick} />

            <div
                className={`w-64 h-fit absolute transition shadow-xl bg-white p-4 rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:border ${positionClassnames} ${showClassname}`}
            >
                <TooltipTriangleIcon className={`absolute ${tooltipTriangleIconClassname}`} />
                <p className='text-xs font-semibold text-gray-800 dark:text-white leading-5 '>{title}</p>
                {withButtons && (
                    <div className='flex justify-end gap-2 mt-4'>
                        <Button size='xs' color='secondary' variant='light' onClick={hideTooltip}>
                            Cancelar
                        </Button>
                        <Button size='xs' variant='light' color='primary' onClick={onOk} loading={loading}>
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
        </a>
    )
}

export default Tooltip

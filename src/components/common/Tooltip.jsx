import { useState } from 'react'
import TooltipTriangleSVG from './../svg/TooltipTriangleSVG'
import Button from './Button'

const Tooltip = ({ title, callbackOnOk, component: Component }) => {
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
    return (
        <a
            tabIndex='0'
            role='link'
            aria-label='tooltip 1'
            className='focus:outline-none focus:ring-gray-300 rounded-full relative flex justify-center items-center'
        >
            <Component onClick={handleClick} />

            {show && (
                <div className='z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out left-5 ml-8 shadow-xl bg-white p-4 rounded dark:bg-slate-800 dark:border-slate-600 dark:border'>
                    <TooltipTriangleSVG />
                    <p className='text-md font-bold text-gray-800 pb-1 dark:text-white'>{title}</p>
                    <div className='flex justify-between mt-4'>
                        <Button size='sm' onClick={hideTooltip}>
                            Cancelar
                        </Button>
                        <Button size='sm' onClick={onOk} loading={loading} color='primary'>
                            Ok
                        </Button>
                    </div>
                </div>
            )}
        </a>
    )
}

export default Tooltip

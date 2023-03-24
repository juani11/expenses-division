import { useState } from 'react'
import TooltipTriangleSVG from '../svg/TooltipTriangleSVG'
import Button from './Button'

const Tooltip = ({ title, callbackOnOk, component: Component }) => {
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)
    const hideTooltip = () => setShow(false)

    return (
        <a
            tabIndex='0'
            role='link'
            aria-label='tooltip 1'
            className='focus:outline-none focus:ring-gray-300 rounded-full relative mt-20 md:mt-0'
        >
            <Component onClick={handleClick} />

            {show && (
                <div className='z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out left-5 ml-8 shadow-xl bg-white p-4 rounded'>
                    <TooltipTriangleSVG />
                    <p className='text-md font-bold text-gray-800 pb-1'>{title}</p>
                    <div className='flex justify-between mt-4'>
                        <Button size='xs' onClick={hideTooltip}>
                            Cancelar
                        </Button>
                        <Button size='xs' onClick={callbackOnOk} color='primary'>
                            Ok
                        </Button>
                    </div>
                </div>
            )}
        </a>
    )
}

export default Tooltip

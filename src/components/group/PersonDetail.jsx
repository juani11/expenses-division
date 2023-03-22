import { useState } from 'react'

const PersonDetail = ({ personName, cost, children }) => {
    const [showButton, setShowButton] = useState(false)

    const handleOnMouseEnter = () => {
        setShowButton(true)
    }

    const handleOnMouseLeave = () => {
        setShowButton(false)
    }

    return (
        <li
            className='flex justify-between items-center gap-5 p-2 hover:bg-gray-50'
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <p className='w-12'>{personName}</p>
            {cost && <p className='bg-gray-50 rounded-md px-2'>{cost}</p>}
            <div className='w-20 h-8'> {showButton && children}</div>
        </li>
    )
}

export default PersonDetail

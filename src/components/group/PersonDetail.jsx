import { useState } from 'react'
import { useGroupStore } from '../../store/store'
import useIncludeExcludePerson from '../../hooks/useIncludeExcludePerson'

const PersonDetail = ({ person, cost, expenseId, children }) => {
    const [showButton, setShowButton] = useState(false)

    const handleOnMouseEnter = () => {
        setShowButton(true)
    }

    const handleOnMouseLeave = () => {
        setShowButton(false)
    }

    const { loading, handleAction: updateIncludedPersonsInExpense } = useIncludeExcludePerson(expenseId)

    const personName = useGroupStore(state => state.personName)

    return (
        <li
            className='flex items-center gap-5 p-2 hover:bg-gray-50'
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <p className='w-28 capitalize'>{personName(person)}</p>
            {/* <MoneyAmount amount={cost} className='bg-gray-50 ' /> */}
            {cost && <p className='m-0 rounded-md px-2'>$ {cost}</p>}
            <div className='w-20 h-8 m-auto'>
                {showButton && children(loading, updateIncludedPersonsInExpense)}
            </div>
        </li>
    )
}

export default PersonDetail

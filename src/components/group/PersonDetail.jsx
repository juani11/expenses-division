import { useState } from 'react'
import { CREDIT } from '../../constants'
import useIncludeExcludePerson from '../../hooks/useIncludeExcludePerson'
import { useGroupStore } from '../../store/store'
import { currencyFormat, floorNumber } from '../../utils/utils'

const PersonDetail = ({ person, cost, expenseId, type, creditTypeInfo, children }) => {
    const [showButton, setShowButton] = useState(false)

    const handleOnMouseEnter = () => {
        setShowButton(true)
    }

    const handleOnMouseLeave = () => {
        setShowButton(false)
    }

    const { loading, handleAction: updateIncludedPersonsInExpense } = useIncludeExcludePerson(expenseId)

    const personName = useGroupStore(state => state.personName)

    const costPerPerson = cost && currencyFormat(floorNumber(cost))

    const costPerPersonPerPayment =
        type === CREDIT ? currencyFormat(floorNumber(cost / creditTypeInfo.cantPayments)) : null

    return (
        <li
            className='flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-slate-600'
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <p className='w-28 capitalize'>{personName(person)}</p>
            {/* <MoneyAmount amount={cost} className='bg-gray-50 ' /> */}
            {costPerPerson && (
                <div className='m-0 flex-1 rounded-md px-2 text-center'>
                    <div className='flex flex-col gap-1 items-center'>
                        <p className='m-0'>$ {costPerPerson}</p>
                        {costPerPersonPerPayment && (
                            <h5 className='bg-primary-500 px-2 py-0.5 text-white rounded-md m-0'>
                                $ {costPerPersonPerPayment} c/ cuota
                            </h5>
                        )}
                    </div>
                </div>
            )}
            <div className='w-20 h-8 '>{showButton && children(loading, updateIncludedPersonsInExpense)}</div>
        </li>
    )
}

export default PersonDetail

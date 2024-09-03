import { CASH, CREDIT } from '../../../constants'
import Label from '../../common/Label'
import RadioItem from '../../common/RadioItem'
import { CashIcon, CreditCardIcon } from '../../icons/icons'

const radioItems = [
    {
        id: CASH,
        value: 'Efectivo/Débito',
        description: 'Si ya pagaste por el gasto',
        icon: <CashIcon className='w-5 h-5 text-gray-500' />
    },
    {
        id: CREDIT,
        value: 'Crédito',
        description: 'Si pagás en cuotas',
        icon: <CreditCardIcon className='w-5 h-5 text-gray-500' />
    }
]

const label = 'Tipo de gasto'

const ExpenseTypeSelection = ({ selectedValue, onClick }) => {
    return (
        <div className='flex flex-col'>
            <Label>{label}</Label>
            <fieldset className='grid grid-cols-2 gap-5'>
                {radioItems.map(radioItem => (
                    <RadioItem
                        key={radioItem.name}
                        item={radioItem}
                        onClick={onClick}
                        selectedValue={selectedValue}
                        withCheckIcon
                    >
                        <div className='flex mt-4 ml-4 mr-4 items-center gap-3'>
                            {radioItem.icon && radioItem.icon}
                            <h5>{radioItem.value}</h5>
                        </div>
                    </RadioItem>
                ))}
            </fieldset>
        </div>
    )
}

export default ExpenseTypeSelection

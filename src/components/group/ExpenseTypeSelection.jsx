import { CASH, PAYMENTS } from '../../constants'
import Label from '../common/Label'
import RadioItem from '../common/RadioItem'
import CashSVG from '../svg/CashSVG'
import CreditCardSVG from '../svg/CreditCardSVG'

const radioItems = [
    {
        name: CASH,
        title: 'Efectivo/Débito',
        description: 'Si ya pagaste por el gasto',
        icon: <CashSVG />
    },
    {
        name: PAYMENTS,
        title: 'Crédito',
        description: 'Si pagás en cuotas',
        icon: <CreditCardSVG width='w-5' height='h-5' />
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
                            <h5 className='m-0'>{radioItem.title}</h5>
                        </div>
                    </RadioItem>
                ))}
            </fieldset>
        </div>
    )
}

export default ExpenseTypeSelection

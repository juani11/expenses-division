import { useState } from 'react'
import { CASH, PAYMENTS } from '../../constants'
import ExpenseTypeSelection from './ExpenseTypeSelection'
import Label from '../common/Label'
import RadioItem from '../common/RadioItem'
import CantPaymentsSelectContainer from './CantPaymentsSelectContainer'
const monthItems = [
    {
        name: 0,
        title: 'ene'
    },
    {
        name: 1,
        title: 'feb'
    },
    {
        name: 2,
        title: 'mar'
    },
    {
        name: 3,
        title: 'abr'
    },
    {
        name: 4,
        title: 'may'
    },
    {
        name: 5,
        title: 'jun'
    },
    {
        name: 6,
        title: 'jul'
    },
    {
        name: 7,
        title: 'ago'
    },
    {
        name: 8,
        title: 'sep'
    },
    {
        name: 9,
        title: 'oct'
    },
    {
        name: 10,
        title: 'nov'
    },
    {
        name: 11,
        title: 'dic'
    }
]

const label = 'Tipo de gasto'

const ExpenseType = ({ control }) => {
    const [expenseType, setExpenseType] = useState(CASH)

    const handleClick = type => {
        setExpenseType(type)
    }

    const [monthFirstPayment, setMonthFirstPayment] = useState(7)
    const [yearFirstPayment, setYearFirstPayment] = useState(2023)

    const handleClickMonth = type => {
        setMonthFirstPayment(type)
    }

    const handleClickYear = type => {
        setYearFirstPayment(type)
    }

    return (
        // Expense type selection
        // Si el expense type es credito --> mostrar CreditExpenseTypeFields
        // CreditExpenseTypeFields incluye: seleccion del mes, del año y cantidad de cuotas

        <>
            <div className='pb-4'>
                <ExpenseTypeSelection selectedValue={expenseType} onClick={handleClick} />
            </div>

            {expenseType === PAYMENTS && (
                <>
                    <div className='pt-4 grid grid-cols-2 gap-5 animate-fade'>
                        <div className='flex flex-col'>
                            <Label>Mes de pago 1er cuota</Label>
                            <fieldset className='grid grid-cols-4 gap-5' name='monthFirstPayment'>
                                {monthItems.map(radioItem => (
                                    <RadioItem
                                        key={radioItem.name}
                                        item={radioItem}
                                        onClick={handleClickMonth}
                                        selectedValue={monthFirstPayment}
                                    >
                                        <div className='flex p-1 justify-center items-center gap-3'>
                                            <h5 className='m-0'>{radioItem.title}</h5>
                                        </div>
                                    </RadioItem>
                                ))}
                            </fieldset>
                        </div>

                        <div>
                            <div className='pb-3 flex flex-col'>
                                {label && <Label>Año de pago 1er cuota</Label>}
                                <fieldset className='grid grid-cols-2 gap-4' name='yearFirstPayment'>
                                    {[
                                        { name: 2023, title: '2023' },
                                        { name: 2024, title: '2024' }
                                    ].map(radioItem => (
                                        <RadioItem
                                            key={radioItem.name}
                                            item={radioItem}
                                            onClick={handleClickYear}
                                            selectedValue={yearFirstPayment}
                                        >
                                            <div className='flex p-1 justify-center items-center gap-3'>
                                                <h5 className='m-0'>{radioItem.title}</h5>
                                            </div>
                                        </RadioItem>
                                    ))}
                                </fieldset>
                            </div>
                            <div className='flex flex-col'>
                                <CantPaymentsSelectContainer name='cantPayments' control={control} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ExpenseType

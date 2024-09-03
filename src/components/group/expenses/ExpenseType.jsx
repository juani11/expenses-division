import { useState } from 'react'
import { useController } from 'react-hook-form'
import { CASH, CREDIT } from '../../../constants'
import CantPaymentsSelectContainer from './CantPaymentsSelectContainer'
import { CreditMonthSelection, CreditYearSelection } from './CreditMonthYearSelection'
import ExpenseTypeSelection from './ExpenseTypeSelection'

const ExpenseType = ({ control }) => {
    const [expenseType, setExpenseType] = useState(CASH)

    // // control by react hook form
    const { field } = useController({
        control,
        name: 'type',
        rules: { required: 'Debe indicar el tipo de gasto' }
    })

    const handleChange = id => {
        // send data to react hook form
        field.onChange(id)

        setExpenseType(id)
    }

    return (
        <>
            <div className='pb-4'>
                <ExpenseTypeSelection selectedValue={expenseType} onClick={handleChange} />
            </div>

            {expenseType === CREDIT && (
                <>
                    <div className='pt-4 grid grid-cols-1 gap-5 animate-fade'>
                        <CantPaymentsSelectContainer name='cantPayments' control={control} />
                        <div className='flex justify-between gap-5 '>
                            <CreditYearSelection control={control} />
                            <CreditMonthSelection control={control} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ExpenseType

import { useController } from 'react-hook-form'
import { CASH, CREDIT } from '../../../constants'
import CantPaymentsSelectContainer from './CantPaymentsSelectContainer'
import { CreditMonthSelection, CreditYearSelection } from './CreditMonthYearSelection'
import ExpenseTypeSelection from './ExpenseTypeSelection'

const ExpenseType = ({ control }) => {
    // // control by react hook form
    const { field, fieldState } = useController({
        control,
        name: 'type',
        defaultValue: CASH,
        rules: { required: 'Debe indicar el tipo de gasto' }
    })

    const { error } = fieldState

    const handleChange = id => {
        // send data to react hook form
        field.onChange(id)
    }

    const expenseType = field.value

    return (
        <>
            <div className='pb-4'>
                <ExpenseTypeSelection selectedValue={field.value} onClick={handleChange} />
            </div>

            {expenseType === CREDIT && (
                <>
                    <div className='pt-4 flex flex-col gap-3 animate-fade'>
                        <CantPaymentsSelectContainer name='cantPayments' control={control} />
                        <div className='pt-4 grid grid-cols-2 gap-5 '>
                            <CreditYearSelection control={control} />
                            <CreditMonthSelection control={control} />
                        </div>
                    </div>
                </>
            )}
            {error && <p className='text-red-500 text-sm '>{error.message}</p>}
        </>
    )
}

export default ExpenseType

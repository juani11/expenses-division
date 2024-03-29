import { useFormContext } from 'react-hook-form'
import { useGroupStore } from '../../../store/store'
import Input from '../../Input'
import ExpenseType from './ExpenseType'
import PersonsCheckBoxGroup from './PersonsCheckBoxGroup'
import ExpenseOwnerSelectContainer from './ExpenseOwnerSelectContainer'

const AddExpenseFormContent = () => {
    const persons = useGroupStore(state => state.persons)

    const {
        register,
        watch,
        control,
        formState: { errors }
    } = useFormContext() // retrieve all hook methods

    const amount = watch('amount')

    return (
        <div>
            <div className='flex gap-4 p-4 h-32 mt-10'>
                <Input
                    label='Nombre del gasto'
                    width='w-3/5'
                    controlledProps={{
                        ...register('name', {
                            required: 'Debe ingresar el nombre',
                            maxLength: { value: 20, message: `Debe ingresar un máximo de 20 carácteres` }
                        })
                    }}
                    error={errors.name}
                />

                <Input
                    label='Costo'
                    addOnBefore='$'
                    width={'w-2/5'}
                    controlledProps={{
                        ...register('amount', {
                            required: 'Debe ingresar el costo',
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                message: 'Debe ingresar un número'
                            }
                        })
                    }}
                    error={errors.amount}
                />
            </div>

            <div className='p-4'>
                <ExpenseOwnerSelectContainer name='person' control={control} />
            </div>

            <div className='p-4'>
                <ExpenseType control={control} />
            </div>

            <div className='p-4'>
                <PersonsCheckBoxGroup
                    persons={persons ?? []}
                    control={control}
                    name='includedPersons'
                    amount={amount}
                />
            </div>
        </div>
    )
}

export default AddExpenseFormContent

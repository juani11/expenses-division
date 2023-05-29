import { useFormContext } from 'react-hook-form'
import { useGroupStore } from '../../store/store'
import Select from '../common/Select'
import Input from '../Input'
import PersonsCheckBoxGroup from './PersonsCheckBoxGroup'

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
        <>
            <div className='flex gap-4 p-4 h-32'>
                <Input
                    label='Nombre del gasto'
                    width='w-3/5'
                    controlledProps={{
                        ...register('name', {
                            required: 'Debe ingresar el nombre del gasto',
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
                            required: 'Debe ingresar el costo del gasto',
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                message: 'Debe ingresar un número'
                            }
                        })
                    }}
                    error={errors.amount}
                />
            </div>
            <Select
                className='flex-1 p-4 '
                label='Persona'
                options={persons ?? []}
                // width='w-72'
                controlledProps={{
                    ...register('person', {
                        required: 'Debe ingresar la persona'
                    })
                }}
                error={errors.person}
            />

            <div className='p-4 mt-7'>
                <PersonsCheckBoxGroup
                    persons={persons ?? []}
                    control={control}
                    name='includedPersons'
                    amount={amount}
                />
            </div>
        </>
    )
}

export default AddExpenseFormContent

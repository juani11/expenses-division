import { useGroupStore } from '../../store/store'
import Select from '../common/Select'
import Input from '../Input'

const AddExpenseFormContent = ({ register, errors }) => {
    const persons = useGroupStore(state => state.persons)

    return (
        <>
            <Input
                label='Nombre del gasto'
                controlledProps={{
                    ...register('name', {
                        required: 'Debe ingresar el nombre del gasto',
                        maxLength: { value: 20, message: `Debe ingresar un máximo de 20 carácteres` }
                    })
                }}
                error={errors.name}
            />

            <Select
                className='mt-5'
                label='Persona'
                options={persons}
                controlledProps={{
                    ...register('person', {
                        required: 'Debe ingresar la persona'
                    })
                }}
                error={errors.person}
            />
            <div className='flex gap-4 items-center mt-5'>
                <div className='text-5xl font-bold'>$</div>
                <Input
                    label='Costo'
                    controlledProps={{
                        ...register('amount', {
                            required: 'Debe ingresar el costo del gasto',
                            valueAsNumber: { value: true, message: 'Debe ingresar un número' }
                            // pattern: {
                            //     value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            //     message: 'Debe ingresar un número'
                            // }
                        })
                    }}
                    error={errors.amount}
                />
            </div>
        </>
    )
}

export default AddExpenseFormContent

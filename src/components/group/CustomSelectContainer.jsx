import { useController } from 'react-hook-form'
import { useGroupStore } from '../../store/store'
import CustomSelect from '../common/CustomSelect'
import { useState } from 'react'

const ExpenseOwnerSelectContainer = ({ control, name }) => {
    const persons = useGroupStore(state => state.persons)

    const personsOptions = persons.map(({ id, name }) => ({
        id,
        value: name
    }))

    // // control by react hook form
    const { field, fieldState } = useController({
        control,
        name,
        rules: { required: 'Debe indicar el propietario del gasto' }
    })
    const { error } = fieldState

    const [selectedValue, setSelectedValue] = useState(null)

    const handleChange = option => {
        const { id, value } = option
        // send data to react hook form
        field.onChange(id)

        setSelectedValue(value)
    }

    return (
        <>
            <CustomSelect
                label='Persona que paga el gasto'
                placeholder='seleccione una persona'
                options={personsOptions}
                handleChange={handleChange}
                selectedValue={selectedValue}
                type={'form'}
            />
            {error && <p className='text-red-500 '>{error.message}</p>}
        </>
    )
}

export default ExpenseOwnerSelectContainer

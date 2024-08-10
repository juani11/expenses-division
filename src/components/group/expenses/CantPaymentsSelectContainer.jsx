import { useState } from 'react'
import { useController } from 'react-hook-form'
import CustomSelect from '../../common/CustomSelect'

const paymentsOptions = [
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        value: i + 1
    })),
    {
        id: 12,
        value: 12
    },
    {
        id: 18,
        value: 18
    },
    {
        id: 24,
        value: 24
    }
]
const CantPaymentsSelectContainer = ({ control, name }) => {
    // // control by react hook form
    const { field, fieldState } = useController({
        control,
        name,
        rules: { required: 'Debe indicar la cantidad de cuotas' }
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
                label='Cantidad de cuotas'
                placeholder='seleccione cuotas'
                options={paymentsOptions}
                handleChange={handleChange}
                selectedValue={selectedValue}
                type={'form'}
            />
            {error && <p className='text-red-500 '>{error.message}</p>}
        </>
    )
}

export default CantPaymentsSelectContainer

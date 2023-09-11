import { useState } from 'react'
import { useController } from 'react-hook-form'
import CustomSelect from '../../common/CustomSelect'

const paymentsOptions = [
    {
        id: 1,
        value: 1
    },
    {
        id: 3,
        value: 3
    },
    {
        id: 4,
        value: 4
    },

    {
        id: 6,
        value: 6
    },
    {
        id: 9,
        value: 9
    },
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

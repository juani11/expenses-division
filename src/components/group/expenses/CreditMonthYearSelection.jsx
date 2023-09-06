import { useState } from 'react'
import { MONTHS } from '../../../constants'
import RadioItem from '../../common/RadioItem'
import Label from '../../common/Label'
import { useController } from 'react-hook-form'

//  Genero las options para la seleccion de los meses
const monthOptions = MONTHS.map(({ number, shortName }) => ({
    id: number,
    value: shortName
}))

const currentYear = new Date().getFullYear()
const yearOptions = [
    {
        id: currentYear,
        value: currentYear.toString()
    },
    {
        id: currentYear + 1,
        value: (currentYear + 1).toString()
    }
]

const creditCardOptions = {
    month: {
        label: 'Mes de pago 1er cuota',
        options: monthOptions,
        classNames: 'grid grid-cols-4 gap-5'
    },
    year: {
        label: 'Año de pago 1er cuota',
        options: yearOptions,
        classNames: 'grid grid-cols-2 gap-5 pb-3 '
    }
}

const CreditPaymentDateOptions = ({ dateType, selectedValue, onClick }) => {
    const { label, options, classNames } = creditCardOptions[dateType]
    return (
        <div className='flex flex-col'>
            <Label>{label}</Label>
            <fieldset className={classNames} name='monthFirstPayment'>
                {options.map(radioItem => (
                    <RadioItem
                        key={radioItem.name}
                        item={radioItem}
                        onClick={onClick}
                        selectedValue={selectedValue}
                    >
                        <div className='flex p-1 justify-center items-center gap-3 '>
                            <h5 className='m-0 capitalize'>{radioItem.value}</h5>
                        </div>
                    </RadioItem>
                ))}
            </fieldset>
        </div>
    )
}

export const CreditMonthSelection = ({ control }) => {
    const [monthFirstPayment, setMonthFirstPayment] = useState(null)

    // // control by react hook form
    const { field, fieldState } = useController({
        control,
        name: 'initialMonth',
        rules: { required: 'Debe indicar el mes' }
    })

    const { error } = fieldState

    const handleChange = id => {
        // send data to react hook form
        field.onChange(id)

        setMonthFirstPayment(id)
    }
    return (
        <div>
            <CreditPaymentDateOptions
                dateType='month'
                selectedValue={monthFirstPayment}
                onClick={handleChange}
            />
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export const CreditYearSelection = ({ control }) => {
    const [yearFirstPayment, setYearFirstPayment] = useState(null)

    // // control by react hook form
    const { field, fieldState } = useController({
        control,
        name: 'initialYear',
        rules: { required: 'Debe indicar el año' }
    })

    const { error } = fieldState

    const handleChange = id => {
        // send data to react hook form
        field.onChange(id)

        setYearFirstPayment(id)
    }

    return (
        <div>
            <CreditPaymentDateOptions
                dateType='year'
                selectedValue={yearFirstPayment}
                onClick={handleChange}
            />
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

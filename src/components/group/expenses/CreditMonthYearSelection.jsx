import { useController } from 'react-hook-form'
import { MONTHS } from '../../../constants'
import CustomSelect from '../../common/CustomSelect'
import Label from '../../common/Label'
import RadioItem from '../../common/RadioItem'

//  Genero las options para la seleccion de los meses
const monthOptions = MONTHS.map(({ number, name }) => ({
    id: number,
    value: name
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
        classNames: 'grid grid-cols-4 gap-4'
    },
    year: {
        label: 'Año de pago 1er cuota',
        options: yearOptions,
        classNames: 'grid grid-cols-2 gap-4  '
    }
}

const CreditPaymentDateOptions = ({ dateType, selectedValue, onClick }) => {
    const { label, options, classNames } = creditCardOptions[dateType]
    return (
        <div className='flex flex-col w-full'>
            <Label>{label}</Label>
            <fieldset className={classNames} name='monthFirstPayment'>
                {options.map(radioItem => (
                    <RadioItem
                        key={radioItem.name}
                        item={radioItem}
                        onClick={onClick}
                        selectedValue={selectedValue}
                        className={'flex justify-center items-center'}
                    >
                        <div className='flex p-1 justify-center items-center gap-3 '>
                            <h5 className='capitalize'>{radioItem.value}</h5>
                        </div>
                    </RadioItem>
                ))}
            </fieldset>
        </div>
    )
}

export const CreditMonthSelection = ({ control }) => {
    // // control by react hook form
    const { field, fieldState } = useController({
        control,
        name: 'initialMonth',
        rules: { required: 'Debe indicar el mes' }
    })

    const { error } = fieldState

    const handleChange = option => {
        // send data to react hook form
        const { id } = option
        field.onChange(id)
    }

    const selectedMonthName = MONTHS[field.value - 1].name
    return (
        <div>
            <CustomSelect
                label={'Mes de pago 1er cuota'}
                placeholder='Seleccione mes'
                options={monthOptions}
                handleChange={handleChange}
                selectedValue={selectedMonthName}
                type='form'
            />
            {error && <p className='text-red-500 text-sm'>{error.message}</p>}
        </div>
    )
}

export const CreditYearSelection = ({ control }) => {
    // const [yearFirstPayment, setYearFirstPayment] = useState(null)

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

        // setYearFirstPayment(id)
    }

    return (
        <div>
            <CreditPaymentDateOptions dateType='year' selectedValue={field.value} onClick={handleChange} />
            {error && <p className='text-red-500 text-sm'>{error.message}</p>}
        </div>
    )
}

import { useState } from 'react'
import ChevronDownSVG from '../svg/ChevronDownSVG'
import Label from './Label'
import { useController } from 'react-hook-form'
import ChevronUpSVG from '../svg/ChevronUpSVG'

const Option = ({ onClick, option }) => {
    return (
        <li
            className='cursor-pointer select-none py-1 px-5 bg-white hover:bg-primary-300 hover:text-white '
            onClick={() => onClick(option)}
        >
            <div className='m-1 uppercase'> {option.value}</div>
        </li>
    )
}

const CustomSelect = ({ control, name, label, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(placeholder ?? options[0]?.value)

    const handleClick = () => setIsOpen(!isOpen)
    const handleChange = option => {
        const { id, value } = option
        // send data to react hook form
        field.onChange(id)

        setSelectedValue(value)
    }

    // // control by react hook form
    const { field, fieldState } = useController({
        control,
        name,
        rules: { required: 'Debe indicar el propietario del gasto' }
    })

    const { error } = fieldState

    return (
        <div className={`flex flex-col p-4`}>
            <Label>{label}</Label>
            <div className='relative' onClick={handleClick}>
                <button
                    type='button'
                    className={`flex w-full items-center justify-between bg-white p-1 border-2 focus-within:border-2 ${
                        error
                            ? 'text-red-400 border-red-200 bg-red-50 focus-within:border-red-300 '
                            : 'border-gray-200 focus-within:border-primary-300 '
                    }`}
                >
                    <span className={`py-2 px-5 uppercase ${selectedValue ?? 'italic text-slate-400'}`}>
                        {selectedValue ?? placeholder}
                    </span>

                    <span className='text-2xl w-5 h-5 grid place-content-center px-5'>
                        {isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
                    </span>
                </button>
                {isOpen && (
                    <ul className='z-10 absolute mt-2 w-full  border border-primary-300 bg-white py-4 max-h-80 overflow-y-auto'>
                        {options.map(option => (
                            <Option key={option.id} option={option} onClick={handleChange} />
                        ))}
                    </ul>
                )}
            </div>
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export default CustomSelect

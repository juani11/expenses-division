import { useState } from 'react'
import ChevronDownSVG from '../svg/ChevronDownSVG'
import Label from './Label'
import ChevronUpSVG from '../svg/ChevronUpSVG'

const types = {
    sorter: {
        container: 'w-52',
        button: 'h-10 rounded'
    },
    form: {
        container: 'w-full',
        button: 'h-14'
    }
}

const Option = ({ onClick, option }) => {
    return (
        <li
            className='cursor-pointer select-none py-1 px-5 bg-white hover:bg-primary-300 hover:text-white '
            onClick={() => onClick(option)}
        >
            <div className='m-1'> {option.value}</div>
        </li>
    )
}

const OptionList = ({ options, handleChange }) => {
    return (
        <ul className='z-10 absolute mt-2 w-full uppercase border border-primary-300 bg-white py-4 max-h-80 overflow-y-auto'>
            {options.map(option => (
                <Option key={option.id} option={option} onClick={handleChange} />
            ))}
        </ul>
    )
}

const Select = ({ placeholder, selectedValue, isOpen, btnClasses }) => {
    return (
        <button
            type='button'
            className={`flex justify-between items-center w-full p-1 border focus-within:border-1 border-gray-200 focus-within:border-primary-300 ${btnClasses} `}
        >
            <span className={`px-5 uppercase ${selectedValue ?? 'text-slate-400'}`}>
                {selectedValue ?? placeholder}
            </span>

            <span className='px-4'>{isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}</span>
        </button>
    )
}
const CustomSelect = ({ label, placeholder, selectedValue, type, ...optionsProps }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => setIsOpen(!isOpen)

    const typeClasess = types[type]
    const { container: containerClasses, button: btnClasses } = typeClasess

    return (
        <div className='flex flex-col'>
            {label && <Label>{label}</Label>}
            <div className={`relative ${containerClasses}`} onClick={handleClick}>
                <Select
                    placeholder={placeholder}
                    selectedValue={selectedValue}
                    isOpen={isOpen}
                    btnClasses={btnClasses}
                />
                {isOpen && <OptionList {...optionsProps} />}
            </div>
        </div>
    )
}

export default CustomSelect

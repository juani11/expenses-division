import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '../icons/icons'
import Label from './Label'
import useClickOutsideElement from '../../hooks/useClickOutsideElement'

const types = {
    sorter: {
        container: 'w-60',
        button: 'h-8 rounded bg-gray-50 dark:bg-slate-900 dark:border dark:border-slate-700'
    },
    form: {
        container: 'w-full',
        button: 'h-14 border focus-within:border-1 border-gray-200 focus-within:border-primary-300  dark:border-slate-700'
    }
}

const Option = ({ onClick, option }) => {
    return (
        <li
            className='cursor-pointer  select-none py-1 px-5 bg-white hover:bg-primary-300 hover:text-white dark:bg-slate-700 dark:hover:bg-slate-800 '
            onClick={() => onClick(option)}
        >
            <div className='m-1'>{option.render ? option.render() : option.value}</div>
            {/* {option.value} */}
        </li>
    )
}

const OptionList = ({ options, handleChange }) => {
    return (
        <ul className='z-10 absolute mt-2 w-full uppercase border rounded border-primary-300 bg-white py-4 max-h-80 overflow-y-auto dark:bg-slate-700 dark:border-slate-600'>
            {options.map(option => (
                <Option key={option.id} option={option} onClick={handleChange} />
            ))}
        </ul>
    )
}

const Select = ({ placeholder, selectedValue, isOpen, btnClasses, ref }) => {
    return (
        <button
            ref={ref}
            type='button'
            className={`flex justify-between items-center w-full p-1  ${btnClasses} `}
        >
            <span className={`px-5 uppercase ${selectedValue ?? 'text-slate-400 '}`}>
                {selectedValue ?? placeholder}
            </span>

            <span className='px-4'>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
        </button>
    )
}
const CustomSelect = ({ label, placeholder, selectedValue, type, ...optionsProps }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => setIsOpen(!isOpen)

    const typeClasess = types[type]
    const { container: containerClasses, button: btnClasses } = typeClasess

    const { elemRef } = useClickOutsideElement(() => setIsOpen(false))

    return (
        <div className='flex flex-col'>
            {label && <Label>{label}</Label>}
            <div ref={elemRef} className={`relative ${containerClasses}`} onClick={handleClick}>
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

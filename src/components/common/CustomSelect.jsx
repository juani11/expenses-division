import { useState } from 'react'
import { ChevronDownIcon } from '../icons/icons'
import Label from './Label'
import useClickOutsideElement from '../../hooks/useClickOutsideElement'

const types = {
    sorter: {
        container: 'w-60',
        button: 'h-8 rounded bg-gray-50 dark:bg-slate-900 dark:border dark:border-slate-700'
    },
    form: {
        container: 'w-full',
        button: 'h-9 rounded text-sm border focus-within:border-1 border-gray-200 focus-within:border-primary-300  dark:border-secondary-700'
    }
}

const Option = ({ onClick, option }) => {
    return (
        <li
            className='cursor-pointer select-none mx-1 rounded py-1.5 px-3 transition bg-white text-black hover:bg-primary-300 hover:text-white dark:bg-secondary-900 dark:hover:bg-secondary-700 dark:text-white '
            onClick={() => onClick(option)}
        >
            <span className='text-sm'>{option.render ? option.render() : option.value}</span>
            {/* {option.value} */}
        </li>
    )
}

const OptionList = ({ options, handleChange, className }) => {
    return (
        <ul
            className={` z-10 absolute transition-all mt-2 w-full capitalize border rounded border-primary-300 bg-white py-1 max-h-80 overflow-y-auto dark:bg-secondary-900 dark:border-secondary-700 ${className}`}
        >
            {options?.map(option => (
                <Option key={option.id} option={option} onClick={handleChange} />
            ))}
        </ul>
    )
}

const Select = ({ placeholder, selectedValue, isOpen, btnClasses, ref }) => {
    const chevronIconClassname = isOpen ? 'rotate-180' : 'rotate-0'
    return (
        <button
            ref={ref}
            type='button'
            className={`flex justify-between capitalize items-center w-full p-1  ${btnClasses} `}
        >
            <span className={`px-3  ${selectedValue ?? 'text-slate-400 '}`}>
                {selectedValue ?? placeholder}
            </span>

            <span className='px-3'>
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${chevronIconClassname}`} />
            </span>
        </button>
    )
}
const CustomSelect = ({ label, placeholder, selectedValue, type, ...optionsProps }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => setIsOpen(!isOpen)

    const typeClasess = types[type]
    const { container: containerClasses, button: btnClasses } = typeClasess

    const { elemRef } = useClickOutsideElement(() => setIsOpen(false))

    const opacityOptionList = isOpen ? ' opacity-1 scale-100' : 'invisible opacity-0 scale-90 '
    return (
        <div className='flex flex-col '>
            {label && <Label>{label}</Label>}
            <div
                ref={elemRef}
                className={`relative min-w-60 first-letter:${containerClasses}`}
                onClick={handleClick}
            >
                <Select
                    placeholder={placeholder}
                    selectedValue={selectedValue}
                    isOpen={isOpen}
                    btnClasses={btnClasses}
                />
                <OptionList {...optionsProps} className={opacityOptionList} />
            </div>
        </div>
    )
}

export default CustomSelect

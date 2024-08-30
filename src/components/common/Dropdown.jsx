import { useState } from 'react'

const dropdownSizes = {
    xs: 'h-7 py-1 px-4 text-xs',
    sm: 'h-[34px] py-1 px-4 text-xs',
    md: 'h-10 py-2 px-4 text-sm ',
    lg: 'h-12 py-2 px-6'
}

const dropdownVariants = {
    default: {
        primary: 'bg-primary text-white hover:bg-primary-400 ',
        secondary: 'bg-secondary text-white hover:bg-secondary-400'
    },
    light: {
        primary: ' bg-primary-50 text-primary hover:bg-primary-100 ',
        secondary: 'bg-secondary-50 text-secondary hover:bg-secondary-100 '
    },
    outline: {
        primary: 'bg-transparent text-primary border border-primary hover:text-primary-400  ',
        secondary: 'bg-transparent text-secondary border border-secondary hover:text-secondary-400 '
    }
}

const dropdownMenuItemVariants = {
    default: {
        primary: 'hover:text-white hover:bg-primary ',
        secondary: 'hover:text-white hover:bg-secondary'
    },
    light: {
        primary: ' hover:text-primary hover:bg-primary-100 ',
        secondary: ' hover:text-secondary hover:bg-secondary-100 '
    },
    outline: {
        primary: 'hover:text-primary hover:border hover:border-primary hover:text-white ',
        secondary: 'hover:text-secondary hover:border hover:border-secondary '
    }
}

const Dropdown = ({ className, size = 'md', variant = 'default', color = 'primary' }) => {
    const [isOpen, setIsOpen] = useState(false)

    const buttonSize = dropdownSizes[size]
    const dropdownVariant = dropdownVariants[variant][color]
    const dropdownMenuItemVariant = dropdownMenuItemVariants[variant][color]

    const opacity = isOpen ? 'opacity-1 scale-100' : 'opacity-0 scale-90 '

    return (
        <div className='relative'>
            <button
                className={`rounded capitalize font-semibold
            ${buttonSize}
            ${dropdownVariant} 
            ${className}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                Dropdown
            </button>
            <div
                className={`absolute border right-0 mt-1 w-52 px-1 py-1 rounded-md z-10 bg-white dark:bg-black dark:border-gray-800 transition-all ${opacity}`}
            >
                <ul className='text-sm font-normal'>
                    <li
                        className={`flex flex-col gap-0.5 justify-start items-start px-2 py-2 my-1 rounded-md cursor-pointer border border-transparent ${dropdownMenuItemVariant}`}
                    >
                        Option 1
                    </li>
                    <li
                        className={`flex flex-col gap-0.5 justify-start items-start px-2 py-2 my-1 rounded-md cursor-pointer border border-transparent  ${dropdownMenuItemVariant}`}
                    >
                        Option 2
                    </li>
                    <li
                        className={`flex flex-col gap-0.5 justify-start items-start px-2 py-2 my-1 rounded-md cursor-pointer border border-transparent  ${dropdownMenuItemVariant}`}
                    >
                        Option 3
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown

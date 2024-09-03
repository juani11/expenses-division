// ${
//     selectedValue === name &&
//     !withCheckIcon &&
//     'bg-primary-500 text-white hover:bg-primary-500 '
// }

import { CheckIcon } from '../icons/icons'

const radioColors = {
    primary: 'border-primary',
    secondary: 'border-secondary'
}
const radioIconColors = {
    primary: 'text-primary',
    secondary: 'text-secondary'
}

const RadioItem = ({
    item,
    selectedValue,
    onClick,
    withCheckIcon,
    color = 'secondary',
    className,
    children
}) => {
    const { id, description } = item
    const radioColor = radioColors[color]
    const radioIconColor = radioIconColors[color]

    return (
        <div
            className={`text-sm min-h-9 border rounded cursor-pointer relative hover:bg-gray-50 dark:hover:bg-slate-600  ${className}
                ${selectedValue === id ? radioColor : 'dark:border-slate-700 '}
                `}
            onClick={() => onClick(id)}
        >
            {children}

            {selectedValue === id && withCheckIcon && (
                <div className={`absolute right-4 top-2 ${radioIconColor}`}>
                    <CheckIcon />
                </div>
            )}
            {description && (
                <p className='text-xs pb-4 pl-4 ml-0.5 my-2 opacity-75 font-light'>{description}</p>
            )}
        </div>
    )
}
export default RadioItem

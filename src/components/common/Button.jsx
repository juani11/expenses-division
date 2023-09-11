import { LoadingIcon } from '../icons/icons'

const buttonSizes = {
    xxs: 'text-sm py-1 px-2',
    xs: 'text-sm h-2 py-4 px-5',
    sm: 'text-sm h-9 py-4 px-6',
    md: ' h-12 py-3 px-5',
    lg: 'h-14 py-4 px-6'
}
const normalStyle = {
    primary: 'bg-primary ',
    secondary: 'bg-secondary dark:bg-slate-600'
}

const loadingStyle = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500'
}

const hoverStyle = {
    primary: 'hover:bg-primary-500',
    secondary: 'hover:bg-secondary-500 dark:hover:bg-slate-500'
}

const Button = ({
    children,
    size = 'md',
    className = '',
    loading = false,
    color = 'secondary',
    width = 'w-auto',
    onClick,
    ...props
}) => {
    const loadingClassName = loading ? loadingStyle[color] : normalStyle[color]
    const hoverClassName = hoverStyle[color]

    const buttonSize = buttonSizes[size]
    return (
        <button
            // type={type && type}
            onClick={onClick}
            className={`flex justify-center items-center rounded capitalize text-white font-bold ${loadingClassName} ${hoverClassName} ${buttonSize} ${width} ${className}`}
            {...props}
        >
            {loading && <LoadingIcon />}
            <div>{children}</div>
        </button>
    )
}

export default Button

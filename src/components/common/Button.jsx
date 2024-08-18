import { LoadingIcon } from '../icons/icons'

const buttonSizes = {
    xs: 'h-7 py-1 px-4 text-xs',
    sm: 'h-[34px] py-1 px-4 text-xs',
    md: 'h-10 py-2 px-4 text-sm ',
    lg: 'h-12 py-2 px-6'
}

const buttonVariant = {
    default: {
        primary: 'bg-primary text-white hover:bg-primary-400 ',
        secondary: 'bg-secondary text-white hover:bg-secondary-400'
    },
    light: {
        primary: 'bg-primary-50 text-primary hover:bg-primary-100 ',
        secondary: 'bg-secondary-50 text-secondary hover:bg-secondary-100 '
    },
    outline: {
        primary: 'bg-transparent text-primary border border-primary  hover:text-white hover:bg-primary ',
        secondary: 'bg-transparent text-secondary border border-secondary hover:text-white hover:bg-secondary'
    }
}

const Button = ({
    children,
    size = 'md',
    color = 'primary',
    width = 'w-auto',
    variant = 'default',
    loading = false,
    className = '',
    onClick,
    ...props
}) => {
    const buttonSize = buttonSizes[size]

    const btnVariant = buttonVariant[variant][color]

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`flex justify-center items-center flex-nowrap gap-2 rounded capitalize font-semibold
                ${buttonSize}
                ${btnVariant}
                ${width}
                ${className}`}
            {...props}
        >
            {loading && <LoadingIcon />}
            {children}
        </button>
    )
}

export default Button

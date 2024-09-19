import { LoadingIcon } from '../icons/icons'

const buttonSizes = {
    icon: 'h-8 w-8 py-1 px-1',
    xs: 'h-7 w-auto py-1 px-4 text-xs',
    sm: 'h-[34px] w-auto py-1 px-4 text-xs',
    md: 'h-10  w-auto py-2 px-4 text-sm ',
    lg: 'h-12 w-auto py-2 px-6'
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
    },
    subtle: {
        primary: 'bg-transparent text-primary hover:bg-primary-50 ',
        secondary: 'bg-transparent text-secondary hover:bg-secondary-50 '
    }
}

const Button = ({
    children,
    size = 'md',
    color = 'primary',

    variant = 'default',
    loading = false,
    className = '',
    onClick,
    ...props
}) => {
    const buttonSize = buttonSizes[size]

    // Si recibe classname, no se tiene en cuenta el variant ni el color de las props.

    const btnVariant = className.includes('bg-') || buttonVariant[variant][color]

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`flex justify-center items-center flex-nowrap gap-2 rounded capitalize font-semibold transition-all 
                ${buttonSize}
                ${btnVariant}
                ${className}`}
            {...props}
        >
            {loading && <LoadingIcon />}
            {children}
        </button>
    )
}

export default Button

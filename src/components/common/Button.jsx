import LoadingSVG from '../svg/LoadingSVG'

const buttonSizes = {
    xs: 'text-sm h-2',
    sm: 'h-4',
    md: 'h-13',
    lg: 'h-13'
}
const normalStyle = {
    primary: 'bg-primary',
    secondary: 'bg-secondary'
}

const loadingStyle = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500'
}

const hoverStyle = {
    primary: 'hover:bg-primary-500',
    secondary: 'hover:bg-secondary-500'
}

const Button = ({
    children,
    size = 'md',
    className = 'py-4 px-6',
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
            onClick={onClick}
            className={`flex justify-center items-center uppercase text-white font-bold ${loadingClassName} ${hoverClassName} ${buttonSize} ${width} ${className}`}
            {...props}
        >
            {loading && <LoadingSVG />}
            <div>{children}</div>
        </button>
    )
}

export default Button

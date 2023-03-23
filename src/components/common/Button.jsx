import LoadingSVG from '../svg/LoadingSVG'

const buttonSizes = {
    xs: 'text-sm h-2',
    sm: 'h-4',
    md: 'h-13',
    lg: 'h-13'
}

const Button = ({
    children,
    size = 'md',
    className = 'py-4 px-6 hover:bg-gray-600',
    loading = false,
    color = 'bg-secondary',
    onClick,
    ...props
}) => {
    const loadingClassName = loading ? 'bg-gray-500' : color

    const buttonSize = buttonSizes[size]
    return (
        <button
            onClick={onClick}
            className={`flex justify-center items-center uppercase text-white font-bold ${loadingClassName} ${buttonSize} ${className}`}
            {...props}
        >
            {loading && <LoadingSVG />}
            <div>{children}</div>
        </button>
    )
}

export default Button

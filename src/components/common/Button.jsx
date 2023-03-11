import LoadingSVG from '../svg/LoadingSVG'

const buttonSizes = {
    xs: 'text-sm h-2',
    sm: 'h-4',
    md: 'h-13',
    lg: 'h-8'
}

const Button = ({ children, size = 'md', loading = false }) => {
    const loadingClassNames = loading ? 'bg-gray-500' : 'bg-secondary'

    const buttonSize = buttonSizes[size]
    return (
        <button
            className={`uppercase font-bold text-white py-4 px-6 hover:bg-gray-600 flex justify-center items-center ${loadingClassNames} ${buttonSize}`}
        >
            {loading && <LoadingSVG />}
            <div>{children}</div>
        </button>
    )
}

export default Button

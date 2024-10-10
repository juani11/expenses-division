const tagSizes = {
    xs: 'h-[20px] py-1 px-2 text-xs',
    sm: 'h-[20px] py-1 px-2 text-xs',
    md: 'h-[22px] py-1 px-2 text-sm ',
    lg: 'h-[24px] py-1 px-2 text-sm '
}

const tagVariants = {
    default: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white'
    },
    light: {
        primary: 'bg-primary-50 text-primary',
        secondary: 'bg-secondary-50 text-secondary'
    },
    outline: {
        primary: 'bg-transparent text-primary border border-primary',
        secondary: 'bg-transparent text-secondary border border-secondary'
    }
}

const Tag = ({ children, size = 'md', variant = 'default', color = 'primary', className = '' }) => {
    const tagSize = tagSizes[size]

    const tagVariant = className.includes('bg-') || tagVariants[variant][color]

    return (
        <span
            className={`flex gap-2 items-center rounded-full font-semibold
            ${tagSize}
            ${tagVariant}
            ${className}`}
        >
            {children}
        </span>
    )
}

export default Tag

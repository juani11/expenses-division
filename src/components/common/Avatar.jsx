const avatarSizes = {
    xs: 'h-10 w-10',
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
}

const avatarColors = {
    primary: 'bg-primary dark:border-slate-700',
    default: 'bg-white hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-500 dark:border-slate-600 '
}

const Avatar = ({ size = 'md', color = 'default', onClick, children }) => {
    const backgroundColor = avatarColors[color]

    return (
        <span
            onClick={onClick}
            className={`shrink-0 border  text-white font-bold border-white rounded-full ${avatarSizes[size]} ${backgroundColor} flex justify-center items-center `}
        >
            {children}
        </span>
    )
}

export default Avatar

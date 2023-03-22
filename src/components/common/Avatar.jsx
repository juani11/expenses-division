const avatarSizes = {
    xs: 'h-8 w-8',
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
}

const avatarColors = ['bg-avatar1', 'bg-avatar2', 'bg-avatar3', 'bg-avatar4']

const Avatar = ({ size = 'md', color = 'bg-primary', onClick, children }) => {
    const backgroundColor =
        color === 'random' ? avatarColors[Math.floor(Math.random() * avatarColors.length)] : color

    return (
        <span
            onClick={onClick}
            className={`shrink-0 border  text-white font-bold border-white rounded-full ${avatarSizes[size]} ${backgroundColor} flex justify-center items-center`}
        >
            {children}
        </span>
    )
}

export default Avatar

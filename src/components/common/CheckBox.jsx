const checkBoxClassName = 'cursor-pointer h-4 w-4 '

const checkBoxColors = {
    primary: 'accent-primary',
    secondary: 'accent-secondary '
}
const CheckBox = ({ label, color = 'secondary', ...rest }) => {
    const chkColor = checkBoxColors[color]

    return (
        <div className='flex items-center gap-3 '>
            <input type='checkbox' className={`cursor-pointer h-4 w-4 ${chkColor}`} {...rest} />
            <span className='leading-none text-md'>{label}</span>
        </div>
    )
}
export default CheckBox

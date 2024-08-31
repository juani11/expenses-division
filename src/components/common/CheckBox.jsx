const checkBoxClassName = 'cursor-pointer accent-primary border-gray-300 rounded h-4 w-4 '

const CheckBox = ({ label, ...rest }) => {
    return (
        <div className='flex items-center gap-3 '>
            <input type='checkbox' className={checkBoxClassName} {...rest} />
            <span className='leading-none text-md'>{label}</span>
        </div>
    )
}
export default CheckBox

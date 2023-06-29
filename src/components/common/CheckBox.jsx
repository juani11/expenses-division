const checkBoxClassName = 'cursor-pointer accent-primary border-gray-300 rounded h-6 w-6'

const CheckBox = ({ label, ...rest }) => {
    return (
        <div className='flex items-center gap-5 py-2 '>
            <input type='checkbox' className={checkBoxClassName} {...rest} />
            <p>{label}</p>
        </div>
    )
}
export default CheckBox

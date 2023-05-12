const checkBoxClassName = 'cursor-pointer accent-primary border-gray-300 rounded h-6 w-6'

const CheckBox = ({ label, checked, onChange }) => {
    return (
        <div className='flex items-center gap-5 p-2 '>
            <input
                type='checkbox'
                className={checkBoxClassName}
                value={label}
                checked={checked}
                onChange={onChange}
            />
            <label>{label}</label>
        </div>
    )
}
export default CheckBox

import Label from './Label'

const Select = ({ label, options, width, className, controlledProps, error }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <Label>{label}</Label>
            <select
                className={`bg-white border text-xl rounded-md ${width} ${
                    error ? 'text-red-500 border-red-500 bg-red-50' : ' text-black border-black'
                } h-14 px-5 `}
                {...controlledProps}
            >
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export default Select

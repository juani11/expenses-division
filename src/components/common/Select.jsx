const Select = ({ label, options, className, controlledProps, error }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor='name' className='text-md text-gray-800 mb-2 '>
                {label}
            </label>
            <select
                className={`bg-white border text-xl rounded-md ${
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

const Input = ({ label, name, width, className = '', controlledProps, error }) => {
    return (
        <div className='flex flex-col'>
            <label htmlFor='name' className='text-md text-gray-800 mb-2 '>
                {label}
            </label>
            <input
                className={`bg-white border text-xl rounded-md focus:border-red-50 ${
                    error ? 'text-red-500 border-red-500 bg-red-50' : ' text-black border-black'
                } h-14 px-5 `}
                {...controlledProps}
            />
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export default Input

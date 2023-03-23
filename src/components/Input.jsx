const Input = ({ label, addOnBefore, name, width, className = '', controlledProps, error }) => {
    return (
        <div className='flex flex-col'>
            <label htmlFor='name' className='text-md text-gray-800 mb-2 '>
                {label}
            </label>

            <div className='flex items-center'>
                {addOnBefore ? (
                    <span className='border-l border-t border-b h-14 p-3 font-bold text-center text-3xl text-white border-black bg-gray-200'>
                        {addOnBefore}
                    </span>
                ) : null}
                <input
                    className={`bg-white border text-xl focus:border-red-50 ${
                        error ? 'text-red-500 border-red-500 bg-red-50' : ' text-black border-black'
                    } h-14 px-5 `}
                    {...controlledProps}
                />
            </div>
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export default Input

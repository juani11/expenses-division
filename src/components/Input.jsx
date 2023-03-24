const Input = ({ label, addOnBefore, width, className = '', controlledProps, error }) => {
    return (
        <div className={`flex flex-col ${width}`}>
            <label htmlFor='name' className='text-md text-gray-800 mb-2 '>
                {label}
            </label>

            <div className={`flex items-center`}>
                {addOnBefore ? (
                    <>
                        <span className='border-l border-t border-b h-14 p-2 font-bold text-center text-4xl text-white border-black bg-gray-200 w-2/6'>
                            {addOnBefore}
                        </span>
                        <input
                            className={`bg-white text-xl focus:border-red-50 w-4/6 border ${
                                error ? 'text-red-500 border-red-500 bg-red-50' : ' text-black border-black'
                            } h-14 px-5 `}
                            {...controlledProps}
                        />
                    </>
                ) : (
                    <input
                        className={`bg-white text-xl focus:border-red-50 w-full border ${
                            error ? 'text-red-500 border-red-500 bg-red-50' : ' text-black border-black'
                        } h-14 px-5 `}
                        {...controlledProps}
                    />
                )}
            </div>
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export default Input

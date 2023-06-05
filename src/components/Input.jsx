import Label from './common/Label'

const Input = ({ label, addOnBefore, width, className = '', controlledProps, error, reference }) => {
    return (
        <div className={`flex flex-col ${width}`}>
            <Label>{label}</Label>
            <div className={`flex items-center`}>
                {addOnBefore ? (
                    <>
                        <span className='border-l border-t border-b h-14 p-2 font-bold text-center text-3xl text-white border-black bg-gray-200 w-2/6'>
                            {addOnBefore}
                        </span>
                        <input
                            className={`bg-white text-xl w-4/6 border appearance-none ${
                                error ? 'text-red-500 border-red-500 bg-red-50' : 'text-black border-black'
                            } h-14 px-5 `}
                            {...(controlledProps ?? { ref: reference })}
                        />
                    </>
                ) : (
                    <input
                        className={`uppercase bg-white text-xl w-full border appearance-none ${
                            error ? 'text-red-500 border-red-500 bg-red-50' : 'text-black border-black'
                        }   h-14 px-5 `}
                        {...(controlledProps ?? { ref: reference })}
                    />
                )}
            </div>
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export default Input

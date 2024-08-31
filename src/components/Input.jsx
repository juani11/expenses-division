import Label from './common/Label'

// Classnames default
const input =
    'h-9 py-1 first-letter:capitalize text-sm shadow-sm outline-none rounded border bg-white w-full focus-within:border appearance-none dark:bg-secondary-900'
// Classnames on error / no error
const inputOnError = 'text-red-500 border-red-200 bg-red-50 focus-within:border-red-300 '
const inputNoError = 'border-gray-200 focus-within:border-primary-300 focus dark:border-secondary-700 '

const Input = ({ label, addOnBefore, width, className = '', controlledProps, error, reference }) => {
    return (
        <div className={`flex flex-col ${width}`}>
            <Label>{label}</Label>
            <div className={`relative flex items-center`}>
                {addOnBefore ? (
                    <>
                        <div className='absolute left-2 pointer-events-none flex items-center'>
                            <span className='text-gray-400 text-sm'>$</span>
                        </div>
                        <input
                            className={` ${input} px-5 ${error ? inputOnError : inputNoError} `}
                            {...(controlledProps ?? { ref: reference })}
                        />
                    </>
                ) : (
                    <div className='flex'>
                        <input
                            className={`${input} px-3 ${error ? inputOnError : inputNoError}  `}
                            {...(controlledProps ?? { ref: reference })}
                        />
                    </div>
                )}
            </div>
            {error && <p className='text-red-500 '>{error.message}</p>}
        </div>
    )
}

export default Input

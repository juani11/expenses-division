import Label from './common/Label'

const Input = ({ label, addOnBefore, width, className = '', controlledProps, error, reference }) => {
    return (
        <div className={`flex flex-col ${width}`}>
            <Label>{label}</Label>
            <div className={`flex items-center`}>
                {addOnBefore ? (
                    <>
                        <span className='outline-none  h-14 p-2 font-bold text-center text-3xl text-white border-primary-300 bg-primary-300 w-2/6 dark:bg-slate-500'>
                            {addOnBefore}
                        </span>
                        <input
                            className={`outline-none focus-within:border bg-white text-xl w-4/6  border appearance-none dark:bg-slate-800 ${
                                error
                                    ? 'text-red-500 border-red-200 bg-red-50 focus-within:border-red-300 '
                                    : ' border-gray-200  focus-within:border-primary-300 dark:border-slate-700'
                            } h-14 px-5 `}
                            {...(controlledProps ?? { ref: reference })}
                        />
                    </>
                ) : (
                    <input
                        className={`outline-none focus-within:border capitalize border bg-white w-full appearance-none dark:bg-slate-800 ${
                            error
                                ? 'text-red-400 border-red-200 bg-red-50 focus-within:border-red-300 '
                                : 'border-gray-200  focus-within:border-primary-300  dark:border-slate-700'
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

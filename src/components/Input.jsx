import Label from './common/Label'

const Input = ({ label, addOnBefore, width, className = '', controlledProps, error, reference }) => {
    return (
        <div className={`flex flex-col ${width}`}>
            <Label>{label}</Label>
            <div className={`flex items-center`}>
                {addOnBefore ? (
                    <>
                        <div className='outline-none rounded-tl rounded-bl  h-14 p-0.5  font-bold text-center text-2xl text-slate-400 border-l border-t border-b border-gray-200   w-2/6 dark:bg-slate-700 dark:border-slate-700'>
                            <div className='bg-gray-100 flex items-center justify-center h-full rounded dark:bg-slate-700 '>
                                {addOnBefore}
                            </div>
                        </div>
                        <input
                            className={`outline-none  focus-within:border-r focus-within:border-t focus-within:border-b bg-white text-xl w-4/6 border-r border-t border-b appearance-none dark:bg-slate-800 ${
                                error
                                    ? 'text-red-500 border-red-200 bg-red-50 focus-within:border-red-300 '
                                    : ' border-gray-200  focus-within:border-primary-300 dark:border-slate-700'
                            } h-14 px-5 `}
                            {...(controlledProps ?? { ref: reference })}
                        />
                    </>
                ) : (
                    <input
                        className={`outline-none  rounded focus-within:border capitalize border bg-white w-full appearance-none dark:bg-slate-800 ${
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

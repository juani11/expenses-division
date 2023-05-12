const checkBoxClassName = 'accent-primary border-gray-300 rounded h-6 w-6'

const CheckBoxGroup = ({ className, options, label }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor='name' className='text-md text-gray-800 mb-2 '>
                {label}
            </label>
            <div className='flex items-center gap-5 p-4'>
                <input type='checkbox' className={checkBoxClassName} />
                <label>TODOS</label>
            </div>
            <hr />

            <div className='flex flex-col'>
                {options?.map(option => {
                    const { id, name } = option
                    return (
                        <>
                            <div key={id} className='flex justify-between items-center p-4'>
                                <div className='flex gap-5 items-center'>
                                    <input type='checkbox' className={checkBoxClassName} />
                                    <label>{name}</label>
                                </div>
                                <p className='m-0'>$400</p>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default CheckBoxGroup

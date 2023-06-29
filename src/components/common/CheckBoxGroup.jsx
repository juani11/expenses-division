import CheckBox from './CheckBox'

const CheckBoxGroup = ({ className, options, label }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor='name' className='text-md text-gray-800 mb-2 '>
                {label}
            </label>
            <div className='p-1'>
                <CheckBox label={'TODOS'} checked />
            </div>
            <hr />
            <div className='flex flex-col'>
                {options?.map(option => {
                    const { id, name } = option
                    return (
                        <div key={id} className='flex justify-between items-center p-1'>
                            <CheckBox label={name} />
                            <p className='m-0'>$400</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CheckBoxGroup

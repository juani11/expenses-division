const Input = ({ name, width }) => {
    const error = false

    return (
        <div className='flex flex-col gap-2 '>
            <label htmlFor='name' className='text-md text-gray-800 '>
                {name}
            </label>
            <input
                className={`bg-white border text-xl rounded-md ${
                    error
                        ? 'text-red-500 border-red-500 bg-red-50'
                        : ' text-black border-black'
                } h-14 px-5 `}
                name='name'
            />
        </div>
    )
}

export default Input

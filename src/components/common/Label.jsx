const Label = ({ children }) => {
    return (
        <label htmlFor='name' className='text-md text-gray-800 mb-2 dark:text-white'>
            {children}
        </label>
    )
}

export default Label

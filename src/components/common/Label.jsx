const Label = ({ children }) => {
    return (
        <label
            htmlFor='name'
            className='text-sm leading-none first-letter:capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-75 mb-2 dark:text-white'
        >
            {children}
        </label>
    )
}

export default Label

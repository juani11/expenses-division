const Button = ({ children }) => {
    return (
        <button className='uppercase mt-9 bg-secondary font-bold text-white py-4 px-6 hover:bg-gray-600 w-full '>
            {children}
        </button>
    )
}

export default Button

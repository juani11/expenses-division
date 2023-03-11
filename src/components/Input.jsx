import { useState } from 'react'

const Input = ({ label, name, width }) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)

    const handleChange = e => {
        const { value } = e.target
        if (value === 'hola') {
            setError(true)
        } else {
            setError(false)
        }
        setInputValue(value)
    }

    return (
        <div className='flex flex-col'>
            <label htmlFor='name' className='text-md text-gray-800 mb-2 '>
                {label}
            </label>
            <input
                className={`bg-white border text-xl rounded-md ${
                    error
                        ? 'text-red-500 border-red-500 bg-red-50'
                        : ' text-black border-black'
                } h-14 px-5 `}
                name={name}
                value={inputValue}
                onChange={handleChange}
            />
            {error && <p className='text-red-500 '>Please enter Note</p>}
        </div>
    )
}

export default Input

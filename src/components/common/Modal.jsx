import { useState } from 'react'
import Button from './Button'
const Modal = ({ isOpen, closeModal, title, callback, children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = () => {
        setIsLoading(true)
        callback().then(res => {
            console.log({ res })
            setIsLoading(false)
            closeModal()
        })
    }
    return (
        <div
            className={`fixed ${
                isOpen ? 'block' : 'hidden'
            } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full animate-fade font-primary`}
            id='my-modal'
        >
            <div className='relative top-20 mx-auto p-5 border w-96 shadow-xl rounded-md bg-white  '>
                <h2>{title}</h2>
                <div className='mt-10 '>
                    {children}
                    <footer className='flex gap-4 items-center mt-10 py-3'>
                        <button
                            onClick={closeModal}
                            className='px-4 py-2 bg-gray-900 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300'
                        >
                            Cancelar
                        </button>
                        <Button
                            loading={isLoading}
                            onClick={handleClick}
                            color='bg-green-500'
                            className={
                                ' px-4 py-2  text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
                            }
                        >
                            OK
                        </Button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Modal

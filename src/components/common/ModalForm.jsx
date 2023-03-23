import { useEffect } from 'react'
import Button from './Button'
const ModalForm = ({ title, subtitle, isOpen, closeModal, isLoading, callback, children }) => {
    useEffect(() => {
        console.log('render ModalForm!')
    })

    return (
        <div
            className={`fixed ${
                isOpen ? 'block' : 'hidden'
            } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full animate-fade font-primary z-50`}
            id='my-modal'
        >
            <div className='relative top-20 mx-auto p-5 border w-fit shadow-xl rounded-md bg-white  '>
                <h2>{title}</h2>
                <p className='max-w-lg'>{subtitle}</p>
                <div className='mt-10'>
                    <form onSubmit={callback}>
                        {children}
                        <footer className='flex gap-4 items-center mt-10 py-3'>
                            <Button
                                type='button'
                                onClick={closeModal}
                                className='px-4 py-2 bg-gray-900 w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300'
                            >
                                Cancelar
                            </Button>{' '}
                            <Button
                                loading={isLoading}
                                color='bg-primary'
                                className={'px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2'}
                            >
                                OK
                            </Button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalForm

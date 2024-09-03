import { useEffect } from 'react'
import { CloseIcon } from '../icons/icons'
import Button from './Button'
import useClickOutsideElement from '../../hooks/useClickOutsideElement'

const ModalDrawerForm = ({ title, isOpen, closeModal, isLoading, callback, children }) => {
    const { elemRef } = useClickOutsideElement(closeModal)

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }, [isOpen])

    return (
        <aside
            className={`fixed top-0 right-0 z-40 h-full px-4 pb-4 overflow-y-scroll transition-transform bg-white w-full md:w-[600px] dark:bg-gray-800  ${
                isOpen ? 'translate-x-0 shadow-xl' : 'translate-x-full'
            }`}
            ref={elemRef}
        >
            <header className='flex justify-between items-center py-4'>
                <h2 className='text-xl uppercase m-0 '>{title}</h2>
                <button
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    onClick={closeModal}
                >
                    <CloseIcon color='black' />
                </button>
            </header>
            <hr />

            <form onSubmit={callback}>
                {children}
                <footer className='flex gap-4 justify-end mt-7 p-4'>
                    <Button type='button' variant='light' color='secondary' onClick={closeModal}>
                        cancelar
                    </Button>{' '}
                    <Button loading={isLoading} color='secondary'>
                        aceptar
                    </Button>
                </footer>
            </form>
        </aside>
    )
}

export default ModalDrawerForm

import { useEffect } from 'react'
import { CloseIcon } from '../icons/icons'

const ModalDrawer = ({ title, isOpen, closeModal, children }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }, [isOpen])
    return (
        <>
            <div
                className={`fixed top-0 right-0 z-40 h-full p-4 overflow-y-scroll transition-transform bg-white w-full md:w-[654px] dark:bg-gray-800  ${
                    isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
                }`}
            >
                <header className='flex justify-between items-center'>
                    <h2 className='py-4 uppercase m-0 '>{title}</h2>
                    <button
                        type='button'
                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  items-center dark:hover:bg-gray-600 dark:hover:text-white'
                        onClick={closeModal}
                    >
                        <CloseIcon color='black' />
                    </button>
                </header>
                <hr />
                <div className='grid grid-rows-[300px_1fr] gap-5 px-10'>{children}</div>
            </div>
        </>
    )
}

export default ModalDrawer

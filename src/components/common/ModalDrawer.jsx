import { useEffect } from 'react'
import { CloseIcon } from '../icons/icons'
import useClickOutsideElement from '../../hooks/useClickOutsideElement'

const ModalDrawer = ({ title, isOpen, closeModal, children }) => {
    const { elemRef } = useClickOutsideElement(closeModal)

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }, [isOpen])

    return (
        <aside
            className={`fixed top-0 right-0 z-40 h-full px-4 pb-4 overflow-y-scroll transition-transform bg-white w-full md:w-[654px] dark:bg-gray-800  ${
                isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
            }`}
            ref={elemRef}
        >
            <header className='flex justify-between items-center py-4 '>
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
            <div id='drawerContent' className='relative'>
                {children}
            </div>
        </aside>
    )
}

export default ModalDrawer

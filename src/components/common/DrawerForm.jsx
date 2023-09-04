import { useEffect } from 'react'
import CloseSVG from '../svg/CloseSVG'
import Button from './Button'

const DrawerForm = ({ title, isOpen, closeDrawer, drawerIsLoading, callback, children }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }, [isOpen])

    return (
        <>
            <div
                className={`fixed top-0 right-0 z-40 h-full p-4 overflow-y-scroll transition-transform bg-white w-full  md:w-[654px] dark:bg-gray-800  ${
                    isOpen ? 'translate-x-0 shadow-xl' : 'translate-x-full'
                }`}
            >
                <header className='flex justify-between items-center'>
                    <h2 className='uppercase m-0 p-4'>{title}</h2>
                    <button
                        type='button'
                        data-drawer-hide='drawer-example'
                        aria-controls='drawer-example'
                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  items-center dark:hover:bg-gray-600 dark:hover:text-white'
                        onClick={closeDrawer}
                    >
                        <CloseSVG color='black' />
                        <span className='sr-only'>Close menu</span>
                    </button>
                </header>
                <hr />

                <form onSubmit={callback}>
                    {children}
                    <footer className='flex gap-4 justify-end mt-7 p-4'>
                        <Button type='button' onClick={closeDrawer} width='w-full'>
                            cancelar
                        </Button>{' '}
                        <Button loading={drawerIsLoading} color='primary' width='w-full'>
                            aceptar
                        </Button>
                    </footer>
                </form>
            </div>
        </>
    )
}

export default DrawerForm

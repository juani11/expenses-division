import useClickOutsideElement from '../../hooks/useClickOutsideElement'
import { CloseIcon } from '../icons/icons'
import Button from './Button'
const Modal = ({ isOpen, closeModal, title, callback, closable, withFooter, isLoading, children }) => {
    const { elemRef } = useClickOutsideElement(closeModal)

    return (
        <div
            className={`fixed ${
                isOpen ? 'block' : 'hidden'
            } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full animate-fade z-50`}
            ref={elemRef}
        >
            <div className='relative top-10 mx-auto p-5 border md:w-[565px] shadow-xl rounded-md bg-white dark:bg-slate-900 dark:border-slate-800 '>
                {/* {closable && (
                    <div className='absolute right-2 top-2'>
                        <Button onClick={closeModal}>
                            <CloseSVG color='white' />
                        </Button>
                    </div>
                )} */}
                <div className='flex justify-between items-center gap-20'>
                    <h2 className='uppercase'>{title}</h2>
                    {
                        <div>
                            <Button onClick={closeModal}>
                                <CloseIcon />
                            </Button>
                        </div>
                    }
                </div>
                <hr />
                <div>
                    {children}

                    {withFooter && (
                        <footer className='flex gap-4 items-center mt-10 py-3'>
                            <Button onClick={closeModal} width='w-full'>
                                Cancelar
                            </Button>
                            <Button loading={isLoading} color='primary' onClick={callback} width='w-full'>
                                OK
                            </Button>
                        </footer>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal

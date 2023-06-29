import { useState } from 'react'
import Avatar from './Avatar'
import Button from './Button'
import CloseSVG from './../svg/CloseSVG'
const Modal = ({ isOpen, closeModal, title, callback, closable, withFooter, children }) => {
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
            } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full animate-fade z-50`}
        >
            <div className='relative top-10 mx-auto p-5 border w-fit shadow-xl rounded-md bg-white  '>
                {/* {closable && (
                    <div className='absolute right-2 top-2'>
                        <Button onClick={closeModal}>
                            <CloseSVG color='white' />
                        </Button>
                    </div>
                )} */}
                <div className='flex justify-between items-center gap-20'>
                    <h2 className='uppercase'>{title}</h2>
                    {closable && (
                        <div>
                            <Button onClick={closeModal}>
                                <CloseSVG color='white' />
                            </Button>
                        </div>
                    )}
                </div>
                <hr />
                <div>
                    {children}

                    {withFooter && (
                        <footer className='flex gap-4 items-center mt-10 py-3'>
                            <Button onClick={closeModal}>Cancelar</Button>
                            <Button loading={isLoading} onClick={handleClick}>
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

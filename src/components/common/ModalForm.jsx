// import CustomizationSVG from '../svg/CustomizationSVG'
import { useEffect } from 'react'
import Button from './Button'

const ModalForm = ({ title, subtitle, isOpen, closeModal, isLoading, callback, children }) => {
    return (
        <div
            className={`fixed ${
                isOpen ? 'block' : 'hidden'
            } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full animate-fade z-50`}
            id='my-modal'
        >
            <div
                className={`relative top-10 mx-auto p-5 border md:w-[565px] shadow-xl rounded-md bg-white dark:bg-slate-800 dark:border-slate-700`}
            >
                <header className='flex justify-between'>
                    <h2 className='p-4 uppercase m-0 '>{title}</h2>
                    {/* <CustomizationSVG width={150} height={150} /> */}
                </header>
                {/* {subtitle && <p className='max-w-xl p-4'>{subtitle}</p>} */}
                <div className='mt-0 '>
                    <form onSubmit={callback}>
                        {children}
                        <footer className='flex gap-4 justify-end mt-7 p-4'>
                            <Button type='button' onClick={closeModal} width='w-full'>
                                cancelar
                            </Button>{' '}
                            <Button loading={isLoading} color='primary' width='w-full'>
                                aceptar
                            </Button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalForm

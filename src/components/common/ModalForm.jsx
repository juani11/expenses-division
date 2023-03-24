import CustomizationSVG from '../svg/CustomizationSVG'
import Button from './Button'
const ModalForm = ({ title, subtitle, isOpen, closeModal, isLoading, callback, children }) => {
    return (
        <div
            className={`fixed ${
                isOpen ? 'block' : 'hidden'
            } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full animate-fade font-primary z-50`}
            id='my-modal'
        >
            <div className='relative top-20 mx-auto p-5 border md:w-[665px] shadow-xl rounded-md bg-white '>
                <div className='flex justify-between'>
                    <h2 className='p-4 uppercase '>{title}</h2>
                    <CustomizationSVG width={150} height={150} />
                </div>
                <p className='max-w-xl p-4'>{subtitle}</p>
                <div className='mt-3'>
                    <form onSubmit={callback}>
                        {children}
                        <footer className='flex gap-4 justify-end mt-10 p-4'>
                            <Button
                                type='button'
                                onClick={closeModal}
                                // className='px-4 py-2 shadow-sm'
                                width='w-full'
                            >
                                cancelar
                            </Button>{' '}
                            <Button
                                loading={isLoading}
                                color='primary'
                                // className={'px-4 py-2 shadow-sm'}
                                width='w-full'
                            >
                                añadir
                            </Button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalForm

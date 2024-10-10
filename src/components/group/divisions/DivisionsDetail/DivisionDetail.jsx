import useModal from '../../../../hooks/useModal'
import Button from '../../../common/Button'
import ModalDrawer from '../../../common/ModalDrawer'

const DivisionDetail = ({ title, children }) => {
    const { openModal, closeModal, modalIsOpen } = useModal()

    return (
        <>
            <Button size='sm' variant='light' color='primary' className='mt-2 z-10' onClick={openModal}>
                ver detalle
            </Button>
            <ModalDrawer title={title} isOpen={modalIsOpen} closeModal={closeModal}>
                {children}
            </ModalDrawer>
        </>
    )
}

export default DivisionDetail

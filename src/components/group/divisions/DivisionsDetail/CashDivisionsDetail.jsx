import useModal from '../../../../hooks/useModal'
import ModalDrawer from '../../../common/ModalDrawer'

const CashDivisionsDetail = ({ children }) => {
    const { openModal, closeModal, modalIsOpen } = useModal()

    return (
        <section id='detail' className='flex justify-center'>
            <button
                className=' uppercase py-1 px-3 rounded text-sm bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:hover:bg-slate-500'
                onClick={openModal}
            >
                Ver detalle
            </button>

            <ModalDrawer title='Detalle de las divisiones' isOpen={modalIsOpen} closeModal={closeModal}>
                {/* <DetailPerPerson involvedExpenses={involvedExpenses} /> */}
                {children}
            </ModalDrawer>
        </section>
    )
}

export default CashDivisionsDetail

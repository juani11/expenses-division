import { NEXT, PREV } from '../../../constants'
import useModal from '../../../hooks/useModal'
import { translatePaymentKey } from '../../../utils/utils'
import { ChevronLeftBtn, ChevronRightBtn } from '../../common/ChevronBtn/chevronBtn'
import ModalDrawer from '../../common/ModalDrawer'
import DetailPerPerson from './DivisionsDetail/DetailPerPerson'

const PaymentNavigation = ({
    payment,
    changePayment,
    creditPayments,
    currentPayment,
    involvedExpensesInMonth
}) => {
    const { openModal, closeModal, modalIsOpen } = useModal()

    const date = translatePaymentKey(currentPayment)

    return (
        <div className='flex justify-between items-center  py-4'>
            <section className='w-11'>
                {payment !== 0 && <ChevronLeftBtn onClick={() => changePayment(PREV)} />}
            </section>
            <div className='flex flex-col gap-0'>
                <h5
                    key={date}
                    className='capitalize px-3 py-1 rounded cursor-pointer hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-700 m-0'
                    onClick={openModal}
                >
                    {date}
                </h5>
                {/* <button
                    className='py-1 rounded text-xs uppercase bg-gray-100 hover:bg-gray-200  dark:bg-slate-600 dark:hover:bg-slate-500'
                    onClick={openModal}
                >
                    Ver detalle
                </button> */}
            </div>
            <ModalDrawer
                title={`Detalle de las divisiones - ${date}`}
                isOpen={modalIsOpen}
                closeModal={closeModal}
            >
                <DetailPerPerson involvedExpenses={involvedExpensesInMonth} />
            </ModalDrawer>
            <div className='w-11'>
                {payment !== creditPayments.length - 1 && (
                    <ChevronRightBtn onClick={() => changePayment(NEXT)} />
                )}
            </div>
        </div>
    )
}

export default PaymentNavigation

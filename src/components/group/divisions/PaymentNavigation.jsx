import { NEXT, PREV } from '../../../constants'
import useModal from '../../../hooks/useModal'
import { translatePaymentKey } from '../../../utils/utils'
import { ChevronLeftBtn, ChevronRightBtn } from '../../common/ChevronBtn/chevronBtn'
import ModalDrawer from '../../common/ModalDrawer'
import DetailPerPerson from './DivisionsDetail/DetailPerPerson'

const PaymentNavigation = ({ payment, changePayment, creditPayments, currentPayment, expensesInMonth }) => {
    const { openModal, closeModal, modalIsOpen } = useModal()

    const date = translatePaymentKey(currentPayment)

    console.log('expensesInMonth', expensesInMonth)
    return (
        <div className='flex justify-between items-center px-4'>
            <section className='w-11'>
                {payment !== 0 && <ChevronLeftBtn onClick={() => changePayment(PREV)} />}
            </section>
            <h5
                key={date}
                className='capitalize cursor-pointer hover:bg-gray-100 px-3 py-2 rounded dark:hover:bg-slate-700'
                onClick={openModal}
            >
                {date}
            </h5>
            <ModalDrawer
                title={`Detalle de las divisiones - ${date}`}
                isOpen={modalIsOpen}
                closeModal={closeModal}
            >
                <DetailPerPerson expensesInMonth={expensesInMonth} />
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

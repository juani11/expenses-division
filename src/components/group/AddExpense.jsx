import Button from '../common/Button'
import ModalForm from '../common/ModalForm'
import useModalForm from './../../hooks/useModalForm'
import AddExpenseFormContent from './AddExpenseFormContent'

const AddExpense = ({ gastos, setGastos }) => {
    const addExpenseOnState = formData => {
        const { name, amount } = formData
        setGastos([
            ...gastos,
            {
                id: '97',
                name,
                amount,
                person: 6,
                excludedPersons: []
            }
        ])
    }

    const { openModal, closeModal, modalIsOpen, modalIsLoading, register, handleSubmit, onSubmit, errors } =
        useModalForm(addExpenseOnState)

    return (
        <>
            <Button onClick={openModal}>añadir gasto</Button>

            <ModalForm
                title='Nuevo gasto'
                isOpen={modalIsOpen}
                closeModal={closeModal}
                isLoading={modalIsLoading}
                callback={handleSubmit(onSubmit)}
            >
                <AddExpenseFormContent register={register} errors={errors} />
            </ModalForm>
        </>
    )
}

export default AddExpense

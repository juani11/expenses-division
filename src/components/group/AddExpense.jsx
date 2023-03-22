import { useForm } from 'react-hook-form'
import useModal from '../../hooks/useModal'
import { useGroupStore } from '../../store/store'
import Button from '../common/Button'
import ModalForm from '../common/ModalForm'
import AddExpenseFormContent from './AddExpenseFormContent'

const AddExpense = () => {
    const addExpense = useGroupStore(state => state.addExpense)

    const addExpenseOnState = formData => {
        const { name, person, amount } = formData
        const newExpense = {
            name,
            amount,
            person: parseInt(person),
            excludedPersons: []
        }
        addExpense(newExpense)
    }

    const { openModal, closeModal, modalIsOpen, modalIsLoading, onSubmit } = useModal(addExpenseOnState)

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

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

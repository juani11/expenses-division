import { FormProvider, useForm } from 'react-hook-form'
import useModal from '../../hooks/useModal'
import { useGroupStore } from '../../store/store'
import Button from '../common/Button'
import ModalForm from '../common/ModalForm'
import AddExpenseFormContent from './AddExpenseFormContent'

const AddExpense = () => {
    const addExpense = useGroupStore(state => state.addExpense)

    const addExpenseOnState = formData => {
        const { name, person, amount, includedPersons } = formData
        const newExpense = {
            name,
            amount: parseInt(amount),
            person: parseInt(person),
            excludedPersons: includedPersons
        }
        addExpense(newExpense)
    }

    const methods = useForm()

    const { openModal, closeModal, modalIsOpen, modalIsLoading, onSubmit } = useModal(addExpenseOnState)

    return (
        <>
            <Button onClick={openModal}>añadir gasto</Button>

            <FormProvider {...methods}>
                <ModalForm
                    title='Nuevo gasto'
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    isLoading={modalIsLoading}
                    callback={methods.handleSubmit(onSubmit)}
                >
                    <AddExpenseFormContent />
                </ModalForm>
            </FormProvider>
        </>
    )
}

export default AddExpense

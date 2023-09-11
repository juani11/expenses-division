import { FormProvider, useForm } from 'react-hook-form'
import useModal from '../../../hooks/useModal'
import { useGroupStore } from '../../../store/store'
import Button from '../../common/Button'
import AddExpenseFormContent from './AddExpenseFormContent'
import { createExpense } from '../../../services/services'
import { CREDIT } from '../../../constants'
import ModalDrawerForm from '../../common/ModalDrawerForm'

const AddExpense = () => {
    const addExpense = useGroupStore(state => state.addExpense)
    const groupInfo = useGroupStore(state => state.info)
    const { id } = groupInfo

    const add = async formData => {
        const { name, person, amount, includedPersons, type, initialMonth, initialYear, cantPayments } =
            formData

        const creditTypeInfo =
            type === CREDIT
                ? {
                      initialMonth,
                      initialYear,
                      cantPayments
                  }
                : null

        const newExpense = {
            name,
            amount: parseInt(amount),
            person: parseInt(person),
            includedPersons,
            type,
            creditTypeInfo
        }

        const request = {
            ...newExpense,
            groupId: id
        }

        console.log(request)
        return createExpense(request)
            .then(res => {
                console.log('rta create expense..')
                console.log(res)
                addExpense({ ...newExpense, id: res })
            })
            .catch(err => {
                console.log(err)
                throw new Error(err)
            })
    }

    const methods = useForm()

    const { openModal, closeModal, modalIsOpen, modalIsLoading, onSubmit } = useModal(add)

    return (
        <>
            <Button onClick={openModal}>añadir gasto</Button>

            <FormProvider {...methods}>
                <ModalDrawerForm
                    title='Nuevo gasto'
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    isLoading={modalIsLoading}
                    callback={methods.handleSubmit(onSubmit)}
                >
                    <AddExpenseFormContent />
                </ModalDrawerForm>
            </FormProvider>
        </>
    )
}

export default AddExpense

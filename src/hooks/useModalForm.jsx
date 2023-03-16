import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mockService } from '../mock/mockService'

const useModalForm = addExpenseOnState => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const [modalIsLoading, setModalIsLoading] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const onSubmit = data => {
        const promise = mockService(data)
        setModalIsLoading(true)
        promise.then(res => {
            setModalIsLoading(false)
            console.log(res)
            addExpenseOnState(data)
            closeModal()
        })
    }

    return {
        openModal,
        closeModal,
        modalIsOpen,
        modalIsLoading,
        register,
        handleSubmit,
        onSubmit,
        errors
    }
}

export default useModalForm

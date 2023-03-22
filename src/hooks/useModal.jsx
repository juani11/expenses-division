import { useState } from 'react'
import { mockService } from '../mock/mockService'

const useModal = callback => {
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
            callback(data)
            closeModal()
        })
    }

    return {
        openModal,
        closeModal,
        modalIsOpen,
        modalIsLoading,
        onSubmit
    }
}

export default useModal

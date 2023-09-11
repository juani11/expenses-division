import { useState } from 'react'

const useModal = callback => {
    const [modalIsLoading, setModalIsLoading] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const onSubmit = async data => {
        setModalIsLoading(true)
        try {
            await callback(data)
            console.log('exito dentro del modal')
            setModalIsLoading(false)
            closeModal()
        } catch (error) {
            console.log('ERROR dentro del modal')
            console.log(error)
            setModalIsLoading(false)
        }
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

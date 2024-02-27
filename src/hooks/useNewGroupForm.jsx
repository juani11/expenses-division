import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'wouter'
import { createGruop } from '../services/services'

const useNewGroupForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const [, setLocation] = useLocation()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [members, setMembers] = useState([])

    const addMember = newMember => setMembers([...members, newMember])

    const removeMember = member => {
        const filteredMembers = members.filter(m => m !== member)

        setMembers(filteredMembers)
    }

    const onSubmit = data => {
        setLoading(true)
        setError(null)
        createGruop({ ...data, members })
            .then(res => {
                // if (!res.ok) throw new Error(res.error)
                console.log(res)
                const { publicGroupId } = res
                setLocation(`/group/${publicGroupId}`)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }

    const onFinish = () => handleSubmit(onSubmit)

    return {
        loading,
        error,
        registerField: register,
        errorsFields: errors,
        onFinish,
        members,
        addMember,
        removeMember
    }
}
export default useNewGroupForm

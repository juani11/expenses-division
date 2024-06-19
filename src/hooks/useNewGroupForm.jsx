import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'wouter'
import { createGroup } from '../services/services'
import useAuth from './useAuth'

const useNewGroupForm = () => {
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()

    const [, setLocation] = useLocation()

    const { session, addGroup } = useAuth()

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
        createGroup({ ...data, members })
            .then(res => {
                // if (!res.ok) throw new Error(res.error)
                console.log(res)
                const { publicGroupId, createdAt } = res

                session &&
                    addGroup({
                        publicId: publicGroupId,
                        name: data.groupName,
                        createdAt,
                        userIsOwner: true
                    })

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
        setValue,
        onFinish,
        members,
        addMember,
        removeMember
    }
}
export default useNewGroupForm

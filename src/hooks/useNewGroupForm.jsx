import { useLocation } from 'wouter'
import { createGruop, mockCreateGroup } from '../services/services'
import { useState } from 'react'

const useNewGroupForm = () => {
    const [location, setLocation] = useLocation()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onSubmit = data => {
        setLoading(true)
        setError(null)
        mockCreateGroup(data)
            .then(res => {
                if (!res.ok) throw new Error(res.error)
                console.log(res)
                const { groupId } = res
                setLocation(`/group/${groupId}`)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }

    return {
        loading,
        error,
        onSubmit
    }
}
export default useNewGroupForm

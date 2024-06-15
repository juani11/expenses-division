import { useState } from 'react'
import { getUserGroups } from '../services/services'

const useUserGroups = () => {
    const [loadingUserGroups, setLoadingUserGroups] = useState(false)
    const [userGroups, setUserGroups] = useState(null)

    const retrieveUserGroups = userEmail => {
        setLoadingUserGroups(true)
        getUserGroups(userEmail)
            .then(res => {
                setUserGroups(res)
            })
            .catch(error => {
                console.log('error dentro de getUserGroups()', error)
            })
            .finally(() => setLoadingUserGroups(false))
    }

    const groupsPublicId = userGroups?.map(group => group.publicId)

    return {
        loadingUserGroups,
        userGroups,
        retrieveUserGroups,
        groupsPublicId
    }
}
export default useUserGroups

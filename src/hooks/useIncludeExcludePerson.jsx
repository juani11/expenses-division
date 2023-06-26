import { useState } from 'react'
import { updateIncludedPersonsOnExpense } from '../services/services'
import { useGroupStore } from '../store/store'

const useIncludeExcludePerson = expenseId => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const updateIncludedPersonsInExpense = useGroupStore(state => state.updateIncludedPersonsInExpense)

    const handleAction = newIncludedPersonsInExpense => {
        setLoading(true)
        setError(false)
        updateIncludedPersonsOnExpense(expenseId, newIncludedPersonsInExpense)
            .then(res => {
                updateIncludedPersonsInExpense(expenseId, newIncludedPersonsInExpense)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
            .finally(() => setLoading(false))
    }

    return {
        loading,
        error,
        handleAction
    }
}

export default useIncludeExcludePerson

import { updateIncludedPersonsOnExpense } from '../services/services'
import { useGroupStore } from '../store/store'

const useIncludeExcludePerson = expenseId => {
    const updateIncludedPersonsInExpense = useGroupStore(state => state.updateIncludedPersonsInExpense)

    const handleAction = newIncludedPersonsInExpense =>
        updateIncludedPersonsOnExpense(expenseId, newIncludedPersonsInExpense).then(res => {
            updateIncludedPersonsInExpense(expenseId, newIncludedPersonsInExpense)
        })

    return handleAction
}

export default useIncludeExcludePerson

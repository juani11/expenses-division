import { create } from 'zustand'
import { getGroup } from '../services/services'

export const EXCLUDE = 'exclude'
export const INCLUDE = 'include'

const useGroupStore = create((set, get) => ({
    loading: true,
    error: null,
    fetch: groupId => {
        // set({ loading: true })
        getGroup(groupId)
            .then(res => {
                const { data: expenseGroup, error } = res
                console.log(error)
                if (error) throw Error('Se produjo un error al consultar el grupo')

                console.log(expenseGroup)
                const [group] = expenseGroup
                console.log(group)

                set({
                    info: { id: groupId, name: group.name },
                    persons: [...group.persons],
                    expenses: [...group.expenses],
                    loading: false
                })
            })
            .catch(error => {
                console.log('entra al catch')
                console.log(error)
                set({ error })
            })
        // set({ loading: false })
    },

    addExpense: newExpense =>
        set(state => ({
            ...state,
            expenses: [...state.expenses, { ...newExpense }]
        })),

    removeExpense: expenseId =>
        set(state => ({
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== expenseId)
        })),

    expense: expenseId => {
        const groupExpenses = get().expenses
        const expense = groupExpenses.find(expense => expense.id === expenseId)
        return expense
    },

    excludedPersonsInExpense: expenseId => {
        const persons = get().persons
        const personsIds = persons.map(person => person.id)
        const expense = get().expense(expenseId)
        const { includedPersons } = expense

        return includedPersons.length === persons.length
            ? []
            : personsIds.filter(person => !includedPersons.includes(person))
    },

    personName: personId => {
        const person = get().persons.find(p => p.id === personId)
        return person.name
    },

    updateIncludedPersonsInExpense: (expenseId, newIncludedPersonsInExpense) => {
        const groupExpenses = get().expenses
        const expenseIndex = groupExpenses.findIndex(expense => expense.id === expenseId)

        const expense = groupExpenses[expenseIndex]

        const updatedExpense = { ...expense, includedPersons: [...newIncludedPersonsInExpense] }

        groupExpenses[expenseIndex] = updatedExpense

        set(state => ({
            ...state,
            expenses: [...groupExpenses]
        }))
    }
}))

export { useGroupStore }

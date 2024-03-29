import { create } from 'zustand'

export const EXCLUDE = 'exclude'
export const INCLUDE = 'include'

const useGroupStore = create((set, get) => ({
    loading: true,
    error: null,
    setGroupData: groupData =>
        set({
            info: { id: groupData.id, name: groupData.name },
            persons: [...groupData.persons],
            expenses: [...groupData.expenses],
            loading: false
        }),
    setLoadingGroupData: () =>
        set(state => ({
            ...state,
            loading: true
        })),

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

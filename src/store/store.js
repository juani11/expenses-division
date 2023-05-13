import { create } from 'zustand'
import { expenses, persons } from '../mock/mockData'

export const EXCLUDE = 'exclude'
export const INCLUDE = 'include'

const useGroupStore = create((set, get) => ({
    info: {
        id: 1,
        name: 'Juntada ATR'
    },

    expenses,
    persons,
    totalAmountExpenses: () => {
        const groupExpenses = get().expenses
        const totalAmountExpenses = groupExpenses.reduce(
            (accumulator, currentValue) => accumulator + currentValue.amount,
            0
        )
        return totalAmountExpenses
    },
    addExpense: newExpense =>
        set(state => ({
            ...state,
            expenses: [...state.expenses, { ...newExpense, id: state.expenses.length + 1 }]
        })),
    removeExpense: expenseId =>
        set(state => ({
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== expenseId)
        })),

    // includedPersonsInExpense: excludedPersonsInExpense => {
    //     const persons = get().persons
    //     return excludedPersonsInExpense.length === 0
    //         ? persons
    //         : persons.filter(person => !excludedPersonsInExpense.includes(person.id))
    // },
    excludedPersonsInExpense: includedPersonsInExpense => {
        const persons = get().persons

        return includedPersonsInExpense.length === persons.length
            ? []
            : persons.filter(person => !includedPersonsInExpense.includes(person.id))
    },
    personIsIncludedInExpense: (personId, excludedPersonsInExpense) =>
        !excludedPersonsInExpense.includes(personId),
    personName: personId => {
        const person = get().persons.find(p => p.id === personId)
        return person.name
    },

    //  Excluir o Incluir persona en un gasto especifico
    handlePersonInExpense: (personId, expenseId, action) => {
        const groupExpenses = get().expenses
        const expenseIndex = groupExpenses.findIndex(expense => expense.id === expenseId)

        const expense = groupExpenses[expenseIndex]

        const personsIncludedInExpenses = expense.includedPersons

        const newIncludedPersonsInExpense =
            action === INCLUDE
                ? [...personsIncludedInExpenses, personId]
                : personsIncludedInExpenses.filter(person => person !== personId)

        const updatedExpense = { ...expense, includedPersons: [...newIncludedPersonsInExpense] }

        groupExpenses[expenseIndex] = updatedExpense

        set(state => ({
            ...state,
            expenses: [...groupExpenses]
        }))
    }
}))

export { useGroupStore }

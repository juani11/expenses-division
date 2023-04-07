import { create } from 'zustand'
import { expenses, persons } from '../mock/mockData'

const useGroupStore = create((set, get) => ({
    info: {
        id: 1,
        name: 'Juntada ATR'
    },

    expenses,
    persons,
    totalAmountExpenses: () => {
        const groupExpenses = get().expenses
        const totalAmountExpenses = groupExpenses.reduce((accumulator, currentValue) => {
            console.log('currentValue.amount')
            console.log(currentValue.amount)
            console.log(typeof currentValue.amount)

            return accumulator + currentValue.amount
        }, 0)
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

    includedPersonsInExpense: excludedPersonsInExpense => {
        const persons = get().persons
        return excludedPersonsInExpense.length === 0
            ? persons
            : persons.filter(person => !excludedPersonsInExpense.includes(person.id))
    },
    personIsIncludedInExpense: (personId, excludedPersonsInExpense) =>
        !excludedPersonsInExpense.includes(personId),
    personName: personId => {
        const person = get().persons.find(p => p.id === personId)
        return person.name
    }
}))

export { useGroupStore }

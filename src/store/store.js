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
        }))
}))

export { useGroupStore }

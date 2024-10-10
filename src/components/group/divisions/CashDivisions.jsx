import { CASH } from '../../../constants'
import { useGroupStore } from '../../../store/store'
import CashDivisionsList from './DivisionsDetail/CashDivisionsList'
import EmptyDivisionsList from './EmptyDivisionsList'

const CashDivisions = () => {
    const expenses = useGroupStore(state => state.expenses)

    const existsCashExpenses = expenses.some(expense => expense.type === CASH)

    return !existsCashExpenses ? (
        <EmptyDivisionsList
            title='Aún no hay divisiones en efectivo/débito...'
            subtitle='Acá verás cuánto le corresponde pagar a cada integrante por gastos en efectivo/débito'
        />
    ) : (
        <CashDivisionsList expenses={expenses} />
    )
}

export default CashDivisions

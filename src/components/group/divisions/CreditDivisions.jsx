import { CREDIT } from '../../../constants'
import { useGroupStore } from '../../../store/store'
import CreditDivisionsList from './CreditDivisionsList'
import EmptyDivisionsList from './EmptyDivisionsList'

const CreditDivisions = () => {
    const expenses = useGroupStore(state => state.expenses)

    const existsCreditExpenses = expenses.some(expense => expense.type === CREDIT)

    return !existsCreditExpenses ? (
        <EmptyDivisionsList
            title='Aún no hay divisiones en cuotas...'
            subtitle=' Acá verás cuánto le corresponde pagar a cada integrante por gastos en crédito'
        />
    ) : (
        <CreditDivisionsList expenses={expenses} />
    )
}

export default CreditDivisions

import { CASH } from '../../../constants'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'
import CashDivisionsList from './DivisionsDetail/CashDivisionsList'
import EmptyDivisionsList from './EmptyDivisionsList'

const CashDivisions = () => {
    const expenses = useGroupStore(state => state.expenses)

    const existsCashExpenses = expenses.some(expense => expense.type === CASH)

    return (
        <Card className='animate-fade'>
            {!existsCashExpenses ? (
                <EmptyDivisionsList
                    title='Aún no hay divisiones con Efectivo/Débito...'
                    subtitle='Acá verás cuánto le corresponde pagar a cada integrante'
                />
            ) : (
                <CashDivisionsList expenses={expenses} />
            )}
        </Card>
    )
}

export default CashDivisions

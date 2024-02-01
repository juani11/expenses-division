import { CREDIT } from '../../../constants'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'
import CreditDivisionsList from './CreditDivisionsList'
import EmptyDivisionsList from './EmptyDivisionsList'

const CreditDivisions = () => {
    const expenses = useGroupStore(state => state.expenses)

    const existsCreditExpenses = expenses.some(expense => expense.type === CREDIT)

    return (
        <Card className='animate-fade'>
            {!existsCreditExpenses ? (
                <EmptyDivisionsList
                    title='Aún no hay divisiones con crédito...'
                    subtitle=' Acá verás cuánto le corresponde pagar a cada integrante por cada mes'
                />
            ) : (
                <CreditDivisionsList expenses={expenses} />
            )}
        </Card>
    )
}

export default CreditDivisions

import { CREDIT } from '../../../constants'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'
import DivisionsListCredit from './DivisionsListCredit'
import EmptyDivisionsList from './EmptyDivisionsList'

const DivisionsCredit = () => {
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
                <DivisionsListCredit expenses={expenses} />
            )}
        </Card>
    )
}

export default DivisionsCredit

import { calculateFinalResult } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'
import DivisionListItem from './DivisionListItem'
import EmptyDivisionsList from './EmptyDivisionsList'

const DivisionsCash = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)

    const results = calculateFinalResult(persons, expenses)

    return (
        <Card className='animate-fade'>
            {results.length === 0 ? (
                <EmptyDivisionsList
                    title='Aún no hay divisiones con Efectivo/Débito...'
                    subtitle='Acá verás cuánto le corresponde pagar a cada integrante'
                />
            ) : (
                <ul>
                    {results.map((division, index) => (
                        <DivisionListItem key={index} division={division} />
                    ))}
                </ul>
            )}
        </Card>
    )
}

export default DivisionsCash

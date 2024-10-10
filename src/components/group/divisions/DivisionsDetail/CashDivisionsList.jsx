import { calculateFinalResult } from '../../../../logic/logic'
import { useGroupStore } from '../../../../store/store'
import DivisionListItem from '../DivisionListItem'
import DetailPerPerson from './DetailPerPerson'
import DivisionDetail from './DivisionDetail'

const CashDivisionsList = ({ expenses }) => {
    const persons = useGroupStore(state => state.persons)

    const { finalResult, involvedExpenses } = calculateFinalResult(persons, expenses)

    return (
        <>
            <ul className='grid gap-y-6 animate-fadeLeft'>
                {finalResult.map((division, index) => (
                    <DivisionListItem key={index} division={division} />
                ))}
            </ul>
            <DivisionDetail title='Detalle de las divisiones'>
                <DetailPerPerson involvedExpenses={involvedExpenses} />
            </DivisionDetail>
        </>
    )
}

export default CashDivisionsList

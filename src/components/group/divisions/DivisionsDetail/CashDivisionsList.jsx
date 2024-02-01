import { calculateFinalResult } from '../../../../logic/logic'
import { useGroupStore } from '../../../../store/store'
import DivisionListItem from '../DivisionListItem'
import DetailPerPerson from './DetailPerPerson'
import CashDivisionsDetail from './CashDivisionsDetail'

const CashDivisionsList = ({ expenses }) => {
    const persons = useGroupStore(state => state.persons)

    const { finalResult, involvedExpenses } = calculateFinalResult(persons, expenses)

    return (
        <>
            <CashDivisionsDetail>
                <DetailPerPerson involvedExpenses={involvedExpenses} />
            </CashDivisionsDetail>
            <ul>
                {finalResult.map((division, index) => (
                    <DivisionListItem key={index} division={division} />
                ))}
            </ul>
        </>
    )
}

export default CashDivisionsList

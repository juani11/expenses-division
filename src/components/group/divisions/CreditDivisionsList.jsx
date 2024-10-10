import { useMemo, useState } from 'react'
import { calculateFinalResultCredit, calculateInitialPaymentIndex } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import { translatePaymentKey } from '../../../utils/utils'
import ChipsSelect from '../../common/ChipsSelect'
import DivisionListItem from './DivisionListItem'
import DivisionDetail from './DivisionsDetail/DivisionDetail'
import DetailPerPerson from './DivisionsDetail/DetailPerPerson'

const useFinalResultsCredit = expenses => {
    const persons = useGroupStore(state => state.persons)

    const memoizedResultsCredit = useMemo(() => {
        return calculateFinalResultCredit(persons, expenses)
    }, [expenses])

    const { finalResults, involvedExpensesPerMonth } = memoizedResultsCredit

    const expenseDates = Object.keys(finalResults)

    const memoizedInitialExpenseDateIndex = useMemo(() => {
        return calculateInitialPaymentIndex(expenseDates)
    }, [])

    return {
        finalResults,
        expensesInvolvedForEachDate: involvedExpensesPerMonth,
        expenseDates,
        memoizedInitialExpenseDateIndex
    }
}

const CreditDivisionsList = ({ expenses }) => {
    const { finalResults, expensesInvolvedForEachDate, expenseDates, memoizedInitialExpenseDateIndex } =
        useFinalResultsCredit(expenses)

    const [selectedChip, setSelectedChip] = useState(() => ({
        id: memoizedInitialExpenseDateIndex,
        name: translatePaymentKey(expenseDates[memoizedInitialExpenseDateIndex], {
            shortName: true
        })
    }))
    const handleChangeSelectedChip = setSelectedChip

    const currentDate = expenseDates[selectedChip.id]

    const currentDateData = finalResults[currentDate]

    const expensesInvolvedInCurrentDate = expensesInvolvedForEachDate[currentDate]

    const chipsData = expenseDates.map((payment, index) => ({
        id: index,
        name: translatePaymentKey(payment, { shortName: true })
    }))

    return (
        <>
            <ChipsSelect
                chipsData={chipsData}
                selectedChip={selectedChip}
                id={'creditMonth'}
                handleChangeSelectedChip={handleChangeSelectedChip}
            />
            <ul className='grid gap-y-6 animate-fadeLeft' key={selectedChip.id}>
                {currentDateData.map((division, index) => (
                    <DivisionListItem key={index} division={division} />
                ))}
            </ul>
            <DivisionDetail title={`Detalle de las divisiones - ${selectedChip.name}`}>
                <DetailPerPerson involvedExpenses={expensesInvolvedInCurrentDate} />
            </DivisionDetail>
        </>
    )
}

export default CreditDivisionsList

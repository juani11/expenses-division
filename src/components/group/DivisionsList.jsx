import { calculateFinalResult } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import Card from '../common/Card'
import MoneyAmount from '../common/MoneyAmount'
import ArrowSVG from './../svg/ArrowSVG'
import PeopleCoffeSVG from './../svg/PeopleCofeeSVG'

const EmptyDivisionsList = () => {
    return (
        <div className='flex flex-col justify-center items-center p-10'>
            <PeopleCoffeSVG width={160} height={180} />
            <h4 className='text-center'>Aún no hay divisiones...</h4>
            <p className='text-center'> Aquí verás cuánto le corresponde pagar a cada integrante</p>
        </div>
    )
}

const DivisionListItem = ({ division }) => {
    const { personaFrom, personaTo, cantidad } = division
    return (
        <li className='rounded mb-3 hover:bg-gray-50 p-4 dark:hover:bg-slate-600'>
            <div className='flex gap-6 items-center '>
                <div className='flex gap-5 items-center'>
                    <div className='flex flex-col gap-1'>
                        <h5 className='m-0 capitalize w-20 '>{personaFrom.name}</h5>
                        <div className='flex items-center gap-1'>
                            <ArrowSVG />
                            <h5 className='m-0 capitalize ml-auto text-gray-400'>{personaTo.name}</h5>
                        </div>
                    </div>
                </div>
                <div className='ml-auto'>
                    <MoneyAmount amount={cantidad} className='bg-primary  text-white font-bold' />
                </div>
            </div>
        </li>
    )
}
const DivisionsList = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)

    const results = calculateFinalResult(persons, expenses)

    return (
        <Card className='animate-fade'>
            {results.length === 0 ? (
                <EmptyDivisionsList />
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

export default DivisionsList

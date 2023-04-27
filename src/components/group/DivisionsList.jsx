import { calcularResultadoFinal } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import { toFloat } from '../../utils/utils'
import ArrowSVG from '../svg/ArrowSVG'
import ExpenseCost from './ExpenseCost'

const DivisionsList = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)
    const includedPersonsInExpense = useGroupStore(state => state.includedPersonsInExpense)
    const personIsIncludedInExpense = useGroupStore(state => state.personIsIncludedInExpense)

    let cantidadesADar = []
    let cantidadesARecibir = []

    const calcularCantidadADarYRecibir = () => {
        persons.forEach(person => {
            let total = 0
            expenses.forEach(expense => {
                const { excludedPersons, amount, person: owner } = expense

                // Si la persona actual esta incluida en el gasto actual, sumo la division por persona del gasto actual en la persona

                if (personIsIncludedInExpense(person.id, excludedPersons)) {
                    const includedPersons = includedPersonsInExpense(excludedPersons)
                    total = toFloat(total + amount / includedPersons.length)
                }
                // Si la persona actual es dueña del gasto actual resto el valor en la persona
                if (owner === person.id) {
                    total = toFloat(total - amount)
                }
            })

            if (total > 0) {
                cantidadesADar = [...cantidadesADar, { person, amount: total }]
                cantidadesARecibir = [...cantidadesARecibir, { person, amount: 0 }]
            } else {
                cantidadesADar = [...cantidadesADar, { person, amount: 0 }]
                cantidadesARecibir = [...cantidadesARecibir, { person, amount: total * -1 }]
            }
        })
    }

    calcularCantidadADarYRecibir()
    const resultados = calcularResultadoFinal(cantidadesADar, cantidadesARecibir)

    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Divisiones</h3>
            </div>
            <ul className='shadow-lg bg-white p-5 rounded-xl '>
                {resultados.map((division, index) => (
                    <li key={index} className='grid grid-cols-4 hover:bg-gray-50 justify-items-center'>
                        <div className='flex items-center gap-3'>
                            {/* <Avatar size={'sm'} color={'bg-secondary'}>
                                {division.personaFrom.name.charAt(0)}
                            </Avatar> */}
                            <div className='flex flex-col'>
                                <h5 className='m-0'>{division.personaFrom.name}</h5>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center '>
                            {/* <h3 className='m-3'>{`${currencyFormat(division.cantidad)}`}</h3> */}
                            <ArrowSVG />
                        </div>
                        <div className='flex items-center gap-3'>
                            {/* <Avatar size={'sm'} color={'bg-secondary'}>
                                {division.personaTo.name.charAt(0)}
                            </Avatar> */}
                            <div className='flex-grow'>
                                <h5 className='m-0'>{division.personaTo.name}</h5>
                            </div>
                        </div>
                        <div className='justify-self-end'>
                            <ExpenseCost cost={division.cantidad} />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DivisionsList

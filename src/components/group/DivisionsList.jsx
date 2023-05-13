import { calcularResultadoFinal } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import { currencyFormat, toFloat } from '../../utils/utils'
import CardHeader from '../common/CardHeader'
import ArrowSVG from '../svg/ArrowSVG'

const DivisionsList = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)
    // const includedPersonsInExpense = useGroupStore(state => state.includedPersonsInExpense)
    // const personIsIncludedInExpense = useGroupStore(state => state.personIsIncludedInExpense)

    let cantidadesADar = []
    let cantidadesARecibir = []

    const personIsIncludedInExpense = (person, includedPersons) => {
        includedPersons.includes(person)
    }
    const calcularCantidadADarYRecibir = () => {
        persons.forEach(person => {
            let total = 0
            expenses.forEach(expense => {
                const { amount, person: owner, includedPersons } = expense

                // Si la persona actual esta incluida en el gasto actual, sumo la division por persona del gasto actual en la persona

                if (personIsIncludedInExpense(person.id, includedPersons)) {
                    // const includedPersons = includedPersonsInExpense(excludedPersons)
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
            <CardHeader title={'divisiones'} />
            <ul className='shadow-lg bg-white py-5 px-2  rounded-xl '>
                {resultados.map((division, index) => (
                    <li key={index} className='flex justify-between items-center mb-4 hover:bg-gray-50 p-3'>
                        <div className='flex gap-1 items-center'>
                            <ArrowSVG />
                            <div className='flex flex-col items-center '>
                                <h5 className='m-0'>{division.personaFrom.name}</h5>
                                <h5 className='m-0'>{division.personaTo.name}</h5>
                            </div>
                        </div>

                        <div className='bg-primary-300 w-24 rounded-2xl text-primary'>
                            <h4 className='m-2 text-center'>{currencyFormat(division.cantidad)}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DivisionsList

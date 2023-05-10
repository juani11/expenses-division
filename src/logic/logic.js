/*  
    2 Estrategias de division:

    1 - 
    Caso en el que todos las personas participantes formen parte de todos los gastos. (No hay personas excluidas de algun gasto)

    Dividir el total de gastos por la cantidad de personas participantes
    totalGastado = 11500
    cantPersonas:3

    division: 11500/3 = 3.8333


    2 -
    Caso en el que existen una o mas personas participantes que NO forman parte de algun gasto en especifico. (Hay personas excluidas de algun gasto)

    Realizar la cuenta por cada gasto en especifico:

    Personas:Juani,Franco,Julia
    Gastos:{
            id: '1',
            name: 'fernet',
            amount: 4300,
            person: 'Franco',
            personasExcluidas:['Juli']
        },
        {
            id: '2',
            name: 'gaseosas',
            amount: 1350,
            person: 'Juani',
            personasExcluidas:[]

        },
        {
            id: '3',
            name: 'patys y pan',
            amount: 5705,
            person: 'Juli',
            personasExcluidas:[]

        }

   

*/
import { expenses, persons } from '../mock/mockData'
import { toFloat } from '../utils/utils'

const cantPersonasGrupo = persons.length

function calcularDivisionPorGasto() {
    return expenses.map(expense => {
        let division

        let cantPersonasADividir
        let personasIncluidasEnGasto

        //  Si no hay personas excluidas en el gasto, se divide entre todos
        if (!expense.excludedPersons) {
            cantPersonasADividir = cantPersonasGrupo
            personasIncluidasEnGasto = persons
        } else {
            cantPersonasADividir = cantPersonasGrupo - expense.excludedPersons.length
            personasIncluidasEnGasto = persons.filter(person => !expense.excludedPersons.includes(person.id))
        }
        const amountPorPersona = expense.amount / cantPersonasADividir

        division.gasto = expense.id
        division.amountPorPersona = amountPorPersona
        division.personasIncluidasEnGasto = personasIncluidasEnGasto

        return division
    })
}

function calcularResultadoFinal(cantidadesAdar, cantidadesARecibir) {
    let resultado = []

    let indexArrayCantidadAdar = 0

    const personasPosiblesARecibir = cantidadesARecibir.filter(elem => elem.amount > 0)
    let indexPersonaPosible = 0

    while (indexArrayCantidadAdar < cantidadesAdar.length) {
        const cantidadAdar = cantidadesAdar[indexArrayCantidadAdar]
        const { person, amount } = cantidadAdar

        if (amount === 0) {
            indexArrayCantidadAdar = indexArrayCantidadAdar + 1
        } else {
            let cantidadRestanteProcesar = amount

            //  Mientras no haya descontado el total que tiene que dar la persona
            //  Busco en el array de personas posibles, para ver a que persona le puede dar y cuanto
            while (
                cantidadRestanteProcesar > 0 &&
                indexPersonaPosible + 1 <= personasPosiblesARecibir.length
            ) {
                const personaPosible = personasPosiblesARecibir[indexPersonaPosible]

                let cantidadResultado
                if (cantidadRestanteProcesar <= personaPosible.amount) {
                    cantidadResultado = cantidadRestanteProcesar
                    personaPosible.cantidad = toFloat(personaPosible.amount - cantidadRestanteProcesar)

                    cantidadRestanteProcesar = 0
                    indexArrayCantidadAdar = indexArrayCantidadAdar + 1
                } else {
                    cantidadResultado = personaPosible.amount

                    cantidadRestanteProcesar = toFloat(cantidadRestanteProcesar - personaPosible.amount)
                    personaPosible.amount = 0
                }
                //  Si la persona posible a la que se le esta devolviendo la plata , ya se le cubrio el total de la devolucion, paso a la siguiente persona.
                if (personaPosible.amount === 0) indexPersonaPosible = indexPersonaPosible + 1

                resultado = [
                    ...resultado,
                    {
                        personaFrom: person,
                        personaTo: personaPosible.person,
                        cantidad: cantidadResultado
                    }
                ]
            }
        }
    }
    return resultado
}

function expensesPerPerson(expenses) {
    const expensesPerPerson = {}

    expenses.forEach(expense => {
        const { person, amount } = expense
        const personExpense = expensesPerPerson[person]
        expensesPerPerson[person] = personExpense
            ? {
                  ...personExpense,
                  person,
                  cantExpenses: personExpense.cantExpenses + 1,
                  amount: personExpense.amount + amount
              }
            : {
                  cantExpenses: 1,
                  amount,
                  person
              }
    })
    return expensesPerPerson
}

export { calcularDivisionPorGasto, calcularResultadoFinal, expensesPerPerson }

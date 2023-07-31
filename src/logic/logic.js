// import dayjs from 'dayjs'
import { expenses, persons } from '../mock/mockData'
import { toFloat } from '../utils/utils'

const PAYMENTS = 'PAYMENTS'

const personIsIncludedInExpense = (person, includedPersons) => {
    return includedPersons.includes(person)
}

const amountOfMoneyToGiveAndReceivePerPerson = () => {
    let amountsToGivePerPerson = []
    let amountsToReceivePerPerson = []

    persons?.forEach(person => {
        let total = 0
        expenses.forEach(expense => {
            const { amount, person: owner, includedPersons } = expense

            // Si la persona actual esta incluida en el gasto actual, sumo la division por persona del gasto actual en la persona

            if (personIsIncludedInExpense(person.id, includedPersons)) {
                total = toFloat(total + amount / includedPersons.length)
            }
            // Si la persona actual es dueña del gasto actual resto el valor en la persona
            if (owner === person.id) {
                total = toFloat(total - amount)
            }
        })

        if (total > 0) {
            amountsToGivePerPerson = [...amountsToGivePerPerson, { person, amount: total }]
            amountsToReceivePerPerson = [...amountsToReceivePerPerson, { person, amount: 0 }]
        } else {
            amountsToGivePerPerson = [...amountsToGivePerPerson, { person, amount: 0 }]
            amountsToReceivePerPerson = [...amountsToReceivePerPerson, { person, amount: total * -1 }]
        }
    })
    return { amountsToGivePerPerson, amountsToReceivePerPerson }
}

function calculateDivisions(amountsToGivePerPerson, amountsToReceivePerPerson) {
    // const { cantidadesADar, cantidadesARecibir } = calcularCantidadADarYRecibir(persons, expenses)
    // const { cantidadesADar, cantidadesARecibir } = testCuotas()

    let resultado = []

    let indexArrayCantidadAdar = 0

    const personasPosiblesARecibir = amountsToReceivePerPerson.filter(elem => elem.amount > 0)
    let indexPersonaPosible = 0

    while (indexArrayCantidadAdar < amountsToGivePerPerson.length) {
        const cantidadAdar = amountsToGivePerPerson[indexArrayCantidadAdar]
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

function totalAmountOfExpenses(groupExpenses) {
    const totalAmountExpenses = groupExpenses?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
    )
    return totalAmountExpenses
}

function cantOfOwnExpensesPerPerson(expenses) {
    const ownExpensesPerPerson = {}

    expenses.forEach(expense => {
        const { person, amount } = expense
        const personExpense = ownExpensesPerPerson[person]
        ownExpensesPerPerson[person] = personExpense
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
    return ownExpensesPerPerson
}

const cantExpensesInWhichEachPersonIsIncluded = expenses => {
    const resul = {}

    expenses.forEach(expense => {
        const { includedPersons } = expense

        includedPersons.forEach(includedPerson => {
            if (resul[includedPerson]) {
                resul[includedPerson]++
            } else {
                resul[includedPerson] = 1
            }
        })
    })

    return resul
}

const calculateFinalResult = () => {
    const { amountsToGivePerPerson, amountsToReceivePerPerson } = amountOfMoneyToGiveAndReceivePerPerson()

    const finalResult = calculateDivisions(amountsToGivePerPerson, amountsToReceivePerPerson)

    return finalResult
}

const add = ({ totalsPerPayment, totalPerPayment, paymentKey, person }) => {
    // TODO: Buscar en el array del mes (totalsPerMonth[paymentKey]) si ya existe la persona, si ya existe se suma a lo que ya tiene
    const personPaymentIndex = totalsPerPayment[paymentKey].findIndex(
        personPayment => personPayment.person.id === person.id
    )

    if (personPaymentIndex !== -1) {
        // Si la persona existe
        const personPayment = totalsPerPayment[paymentKey][personPaymentIndex]
        personPayment.amount = toFloat(personPayment.amount + totalPerPayment)
        totalsPerPayment[paymentKey][personPaymentIndex] = personPayment
    } else {
        // Si no existe la agrego
        totalsPerPayment[paymentKey].push({ person, amount: totalPerPayment })
    }
}
const groupTotalPerPaymentByMonth = ({
    paymentDates,
    cantPayments,
    totalsPerPayment,
    person,
    totalPerPayment
}) => {
    const { start_month: startMonth, start_year: startYear } = paymentDates

    const paymentDate = new Date(startYear, startMonth)
    console.log(paymentDate)

    for (let i = 1; i <= cantPayments; i++) {
        const paymentKey = `${paymentDate.getMonth()}_${paymentDate.getUTCFullYear()}`
        //  Ej key para agosto 2023: --> [7_2023]

        totalsPerPayment[paymentKey] = totalsPerPayment[paymentKey] ?? []

        // Buscar en el array del mes (totalsPerMonth[paymentKey]) si ya existe la persona, si ya existe se suma a lo que ya tiene
        add({ totalsPerPayment, totalPerPayment, paymentKey, person })

        paymentDate.setMonth(paymentDate.getMonth() + 1)
    }
}

//  Prueba de calculo de division de gastos para gastos que son del tipo "en cuotas"
const amountOfMoneyToGiveAndReceivePerPersonPerPayment = () => {
    const paymentsExpenses = expenses.filter(expense => expense.type === PAYMENTS)
    const amountsToGivePerPersonPerPayment = {}
    const amountsToReceivePerPersonPerPayment = {}

    const totalsPerPayment = {}
    persons?.forEach(person => {
        let totalPerPayment = 0

        paymentsExpenses.forEach(expense => {
            const {
                person: owner,
                includedPersons,
                amount_per_payment: amountPerpayment,
                cant_payments: cantPayments,
                dates_payments: paymentDates
            } = expense

            // Si la persona actual esta incluida en el gasto actual, sumo la division por persona del gasto actual en la persona

            if (personIsIncludedInExpense(person.id, includedPersons)) {
                // total por cada cuota
                totalPerPayment = toFloat(amountPerpayment / includedPersons.length)
            }
            // Si la persona actual es dueña del gasto actual resto el valor en la persona
            if (owner === person.id) {
                totalPerPayment = toFloat(totalPerPayment - amountPerpayment)
            }

            //  Guardar por cada mes el totalPerPayment
            groupTotalPerPaymentByMonth({
                paymentDates,
                cantPayments,
                totalsPerPayment,
                person,
                totalPerPayment
            })
        })
    })

    Object.keys(totalsPerPayment).forEach(paymentKey => {
        totalsPerPayment[paymentKey].forEach(personPayment => {
            const { person, amount } = personPayment
            const d = amountsToGivePerPersonPerPayment[paymentKey]
            const r = amountsToReceivePerPersonPerPayment[paymentKey]

            if (amount > 0) {
                amountsToGivePerPersonPerPayment[paymentKey] = [...(d ?? []), { person, amount }]
                amountsToReceivePerPersonPerPayment[paymentKey] = [...(r ?? []), { person, amount: 0 }]
            } else {
                amountsToGivePerPersonPerPayment[paymentKey] = [...(d ?? []), { person, amount: 0 }]
                amountsToReceivePerPersonPerPayment[paymentKey] = [
                    ...(r ?? []),
                    { person, amount: amount * -1 }
                ]
            }
        })
    })
    return { amountsToGivePerPersonPerPayment, amountsToReceivePerPersonPerPayment }
}

const calculateFinalResultPayments = () => {
    const { amountsToGivePerPersonPerPayment, amountsToReceivePerPersonPerPayment } =
        amountOfMoneyToGiveAndReceivePerPersonPerPayment()

    const finalResults = {}
    Object.keys(amountsToGivePerPersonPerPayment).forEach(item => {
        const result = calculateDivisions(
            amountsToGivePerPersonPerPayment[item],
            amountsToReceivePerPersonPerPayment[item]
        )

        finalResults[item] = result
    })

    return finalResults
}

export {
    calculateFinalResult,
    totalAmountOfExpenses,
    cantOfOwnExpensesPerPerson,
    cantExpensesInWhichEachPersonIsIncluded,
    calculateFinalResultPayments
}

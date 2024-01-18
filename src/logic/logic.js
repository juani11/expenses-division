// import dayjs from 'dayjs'
import { CASH, CREDIT } from '../constants'
import {
    currentDate,
    floorNumber,
    generatePaymentKey,
    getPercentage,
    getRoundedPercentage,
    toFloat
} from '../utils/utils'

const personIsIncludedInExpense = (person, includedPersons) => {
    return includedPersons.includes(person)
}

const amountOfMoneyToGiveAndReceivePerPerson = (persons, cashExpenses) => {
    let amountsToGivePerPerson = []
    let amountsToReceivePerPerson = []

    persons?.forEach(person => {
        let total = 0
        cashExpenses.forEach(expense => {
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
                let porcentajeResultado = 0

                if (cantidadRestanteProcesar <= personaPosible.amount) {
                    cantidadResultado = cantidadRestanteProcesar

                    personaPosible.amount = toFloat(personaPosible.amount - cantidadRestanteProcesar)

                    cantidadRestanteProcesar = 0
                    indexArrayCantidadAdar = indexArrayCantidadAdar + 1
                } else {
                    cantidadResultado = personaPosible.amount

                    cantidadRestanteProcesar = toFloat(cantidadRestanteProcesar - personaPosible.amount)
                    personaPosible.amount = 0
                }
                porcentajeResultado = getPercentage(cantidadResultado, amount)
                //  Si la persona posible a la que se le esta devolviendo la plata , ya se le cubrio el total de la devolucion, paso a la siguiente persona.
                if (personaPosible.amount === 0) indexPersonaPosible = indexPersonaPosible + 1

                resultado = [
                    ...resultado,
                    {
                        personaFrom: person,
                        personaTo: personaPosible.person,
                        cantidad: cantidadResultado,

                        porcentajePersonaFrom: porcentajeResultado
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

const calculateFinalResult = (persons, expenses) => {
    const cashExpenses = expenses.filter(expense => expense.type === CASH)

    const { amountsToGivePerPerson, amountsToReceivePerPerson } = amountOfMoneyToGiveAndReceivePerPerson(
        persons,
        cashExpenses
    )

    console.log('amountsToGivePerPerson', amountsToGivePerPerson)
    console.log('amountsToReceivePerPerson', amountsToReceivePerPerson)

    const finalResult = calculateDivisions(amountsToGivePerPerson, amountsToReceivePerPerson)

    console.log('finalResult', finalResult)
    return finalResult
}

const add = ({ totalsPerPayment, totalPerPayment, paymentKey, person }) => {
    // Buscar en el array del mes (totalsPerMonth[paymentKey]) si ya existe la persona, si ya existe se suma a lo que ya tiene
    const personPaymentIndex = totalsPerPayment[paymentKey].findIndex(
        personPayment => personPayment.person.id === person.id
    )

    if (personPaymentIndex !== -1) {
        // Si la persona existe
        const personPayment = totalsPerPayment[paymentKey][personPaymentIndex]
        personPayment.amount = floorNumber(personPayment.amount + totalPerPayment)
        totalsPerPayment[paymentKey][personPaymentIndex] = personPayment
    } else {
        // Si no existe la agrego
        totalsPerPayment[paymentKey].push({
            person,
            amount: totalPerPayment
        })
    }
}
const groupTotalPerPaymentByMonth = ({
    creditTypeInfo,
    totalsPerPayment,
    person,
    totalPerPayment,
    expenseName,
    expensesPerMonth,
    expenseId,
    amountPerpayment
}) => {
    const { initialMonth, initialYear, cantPayments } = creditTypeInfo

    const paymentDate = currentDate(initialYear, initialMonth)

    for (let i = 1; i <= cantPayments; i++) {
        const paymentKey = generatePaymentKey(paymentDate)

        totalsPerPayment[paymentKey] ??= []

        // Buscar en el array del mes (totalsPerMonth[paymentKey]) si ya existe la persona, si ya existe se suma a lo que ya tiene
        add({
            totalsPerPayment,
            totalPerPayment,
            paymentKey,
            person
        })

        //  Genero los datos para usar en el detalle de cada mes.
        // TODO REFACTORIZAR ESTO.
        expensesPerMonth[paymentKey] ??= { expenses: {}, totals: {} }

        expensesPerMonth[paymentKey].expenses[expenseId] = {
            expenseName,
            amountsPerPerson: expensesPerMonth[paymentKey].expenses[expenseId]?.amountsPerPerson
                ? [
                      ...expensesPerMonth[paymentKey].expenses[expenseId].amountsPerPerson,
                      { person, amount: totalPerPayment }
                  ]
                : [{ person, amount: totalPerPayment }],
            numberOfPayment: i,
            cantPayments,
            amountPerpayment
        }
        expensesPerMonth[paymentKey].totals[person.id] ??= {
            name: person.name,
            amount: 0
        }
        expensesPerMonth[paymentKey].totals[person.id].amount += totalPerPayment

        paymentDate.setMonth(paymentDate.getMonth() + 1)
    }
}

//  Calculo de division de gastos para gastos que son del tipo "CREDITO"
const amountOfMoneyToGiveAndReceivePerPersonPerPayment = (persons, creditExpenses) => {
    const amountsToGivePerPersonPerPayment = {}
    const amountsToReceivePerPersonPerPayment = {}

    const expensesPerMonth = {}

    const totalsPerPayment = {}
    persons?.forEach(person => {
        creditExpenses.forEach(expense => {
            const { person: owner, name: expenseName, includedPersons, amount, creditTypeInfo, id } = expense

            // Total por cada cuota
            let totalPerPayment = 0

            const amountPerpayment = floorNumber(amount / creditTypeInfo.cantPayments)

            // Si la persona actual esta incluida en el gasto actual, sumo la division por persona del gasto actual en la persona
            if (personIsIncludedInExpense(person.id, includedPersons)) {
                totalPerPayment = floorNumber(amountPerpayment / includedPersons.length)
            }
            // Si la persona actual es dueña del gasto actual resto el valor en la persona
            if (owner === person.id) {
                totalPerPayment = floorNumber(totalPerPayment - amountPerpayment)
            }

            //  Guardar por cada mes el totalPerPayment
            groupTotalPerPaymentByMonth({
                creditTypeInfo,
                totalsPerPayment,
                person,
                totalPerPayment,
                expenseName,
                expenseId: id,
                expensesPerMonth,
                amountPerpayment
            })
        })
    })

    console.log('expensesPerMonth', expensesPerMonth)
    console.log('totalsPerPayment', totalsPerPayment)

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

    return {
        amountsToGivePerPersonPerPayment,
        amountsToReceivePerPersonPerPayment,
        expensesPerMonth
    }
}

const calculateFinalResultCredit = (persons, expenses) => {
    const creditExpenses = expenses.filter(expense => expense.type === CREDIT)

    const { amountsToGivePerPersonPerPayment, amountsToReceivePerPersonPerPayment, expensesPerMonth } =
        amountOfMoneyToGiveAndReceivePerPersonPerPayment(persons, creditExpenses)

    console.log({ amountsToGivePerPersonPerPayment, amountsToReceivePerPersonPerPayment })

    const finalResults = {}
    Object.keys(amountsToGivePerPersonPerPayment).forEach(item => {
        const result = calculateDivisions(
            amountsToGivePerPersonPerPayment[item],
            amountsToReceivePerPersonPerPayment[item]
        )

        finalResults[item] = result
    })

    return {
        finalResults,
        amountsToGivePerPersonPerPayment,
        amountsToReceivePerPersonPerPayment,
        expensesPerMonth
    }
}

export {
    calculateFinalResult,
    calculateFinalResultCredit,
    cantExpensesInWhichEachPersonIsIncluded,
    cantOfOwnExpensesPerPerson,
    totalAmountOfExpenses
}

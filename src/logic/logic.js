// import dayjs from 'dayjs'
import { CASH, CREDIT } from '../constants'
import {
    currentDate,
    floorNumber,
    generateDateFromPaymentKey,
    generatePaymentKey,
    getPercentage,
    toFloat
} from '../utils/utils'

const personIsIncludedInExpense = (person, includedPersons) => {
    return includedPersons.includes(person)
}

const amountOfMoneyToGiveAndReceivePerPerson = (persons, cashExpenses) => {
    let amountsToGivePerPerson = []
    let amountsToReceivePerPerson = []

    const involvedExpenses = { expenses: {}, totals: {} }

    persons?.forEach(person => {
        let total = 0
        involvedExpenses.totals[person.id] = {
            name: person.name,
            amounts: {
                toPay: 0,
                paid: 0,
                diff: 0
            }
        }
        cashExpenses.forEach(expense => {
            const { amount, person: owner, name: expenseName, includedPersons, id } = expense

            const personAmountsInExpense = {
                toPay: 0,
                paid: 0,
                diff: 0
            }

            // Si la persona actual esta incluida en el gasto actual, sumo la division por persona del gasto actual en la persona

            if (personIsIncludedInExpense(person.id, includedPersons)) {
                total = toFloat(total + amount / includedPersons.length)
                personAmountsInExpense.toPay = floorNumber(amount / includedPersons.length)
            }
            // Si la persona actual es dueña del gasto actual resto el valor en la persona
            if (owner === person.id) {
                total = toFloat(total - amount)
                personAmountsInExpense.paid = amount
            }

            personAmountsInExpense.diff = floorNumber(
                personAmountsInExpense.paid - personAmountsInExpense.toPay
            )

            involvedExpenses.expenses[id] = {
                expenseName,
                amountsPerPerson: involvedExpenses.expenses[id]?.amountsPerPerson
                    ? [
                          ...involvedExpenses.expenses[id].amountsPerPerson,
                          { person, amounts: personAmountsInExpense }
                      ]
                    : [{ person, amounts: personAmountsInExpense }]
            }

            involvedExpenses.totals[person.id].amounts.toPay += personAmountsInExpense.toPay
            involvedExpenses.totals[person.id].amounts.paid += personAmountsInExpense.paid
            involvedExpenses.totals[person.id].amounts.diff += personAmountsInExpense.diff
        })

        if (total > 0) {
            amountsToGivePerPerson = [...amountsToGivePerPerson, { person, amount: total }]
            amountsToReceivePerPerson = [...amountsToReceivePerPerson, { person, amount: 0 }]
        } else {
            amountsToGivePerPerson = [...amountsToGivePerPerson, { person, amount: 0 }]
            amountsToReceivePerPerson = [...amountsToReceivePerPerson, { person, amount: total * -1 }]
        }
    })
    return { amountsToGivePerPerson, amountsToReceivePerPerson, involvedExpenses }
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

                    personaPosible.amount -= cantidadRestanteProcesar

                    cantidadRestanteProcesar = 0
                    indexArrayCantidadAdar = indexArrayCantidadAdar + 1
                } else {
                    cantidadResultado = personaPosible.amount

                    cantidadRestanteProcesar -= personaPosible.amount
                    personaPosible.amount = 0
                }
                porcentajeResultado = getPercentage(cantidadResultado, amount)
                //  Si la persona posible a la que se le esta devolviendo la plata , ya se le cubrio el total de la devolucion, paso a la siguiente persona.
                if (personaPosible.amount === 0) indexPersonaPosible += 1

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

    const { amountsToGivePerPerson, amountsToReceivePerPerson, involvedExpenses } =
        amountOfMoneyToGiveAndReceivePerPerson(persons, cashExpenses)

    console.log('amountsToGivePerPerson', amountsToGivePerPerson)
    console.log('amountsToReceivePerPerson', amountsToReceivePerPerson)
    console.log('involvedExpenses', involvedExpenses)

    const finalResult = calculateDivisions(amountsToGivePerPerson, amountsToReceivePerPerson)

    console.log('finalResult', finalResult)
    return { finalResult, involvedExpenses }
}

const add = ({ totalsPerPayment, totalPerPayment, paymentKey, person }) => {
    // Buscar en el array del mes (totalsPerMonth[paymentKey]) si ya existe la persona, si ya existe se suma a lo que ya tiene
    const personPaymentIndex = totalsPerPayment[paymentKey].findIndex(
        personPayment => personPayment.person.id === person.id
    )

    if (personPaymentIndex !== -1) {
        // Si la persona existe
        const personPayment = totalsPerPayment[paymentKey][personPaymentIndex]
        personPayment.amount = personPayment.amount + totalPerPayment
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
    expenseName,
    involvedExpensesPerMonth,
    expenseId,
    amountPerpayment,
    amountsPerPayment
}) => {
    const { initialMonth, initialYear, cantPayments } = creditTypeInfo

    const paymentDate = currentDate(initialYear, initialMonth)

    for (let i = 1; i <= cantPayments; i++) {
        const paymentKey = generatePaymentKey(paymentDate)

        totalsPerPayment[paymentKey] ??= []

        // Buscar en el array del mes (totalsPerMonth[paymentKey]) si ya existe la persona, si ya existe se suma a lo que ya tiene
        add({
            totalsPerPayment,
            totalPerPayment: amountsPerPayment.diff,
            paymentKey,
            person
        })

        //  Genero los datos para usar en el detalle de cada mes.
        // TODO REFACTORIZAR ESTO.
        involvedExpensesPerMonth[paymentKey] ??= { expenses: {}, totals: {} }

        involvedExpensesPerMonth[paymentKey].expenses[expenseId] = {
            expenseName,
            amountsPerPerson: involvedExpensesPerMonth[paymentKey].expenses[expenseId]?.amountsPerPerson
                ? [
                      ...involvedExpensesPerMonth[paymentKey].expenses[expenseId].amountsPerPerson,
                      { person, amounts: amountsPerPayment }
                  ]
                : [{ person, amounts: amountsPerPayment }],
            numberOfPayment: i,
            cantPayments,
            amountPerpayment
        }
        involvedExpensesPerMonth[paymentKey].totals[person.id] ??= {
            name: person.name,
            amounts: {
                toPay: 0,
                paid: 0,
                diff: 0
            }
        }
        involvedExpensesPerMonth[paymentKey].totals[person.id].amounts.toPay += amountsPerPayment.toPay
        involvedExpensesPerMonth[paymentKey].totals[person.id].amounts.paid += amountsPerPayment.paid
        involvedExpensesPerMonth[paymentKey].totals[person.id].amounts.diff += amountsPerPayment.diff

        paymentDate.setMonth(paymentDate.getMonth() + 1)
    }
}

//  Calculo de division de gastos para gastos que son del tipo "CREDITO"
const amountOfMoneyToGiveAndReceivePerPersonPerPayment = (persons, creditExpenses) => {
    const amountsToGivePerPersonPerPayment = {}
    const amountsToReceivePerPersonPerPayment = {}

    const involvedExpensesPerMonth = {}

    const totalsPerPayment = {}
    persons?.forEach(person => {
        creditExpenses.forEach(expense => {
            const { person: owner, name: expenseName, includedPersons, amount, creditTypeInfo, id } = expense

            const amountPerpayment = floorNumber(amount / creditTypeInfo.cantPayments)

            const amountsPerPayment = {
                toPay: 0 /* Es el monto que le corresponde pagar a la persona por estar involucrado en el gasto */,
                paid: 0 /* Es el monto que la persona ya pagó (por estar anotado como "pagador" del gasto) */,
                diff: 0 /* Es la diferencia entre el "toPay" y "paid". Esta diferencia, da como resultado , la situacion final de la persona en el gasto: Si el resultado es positivo. La persona debe "recibir" ese monto Si el resultado es negativo . La persona debe "dar" ese monto */
            }
            // Si la persona actual esta incluida en el gasto actual, sumo la division por persona del gasto actual en la persona
            if (personIsIncludedInExpense(person.id, includedPersons)) {
                // totalPerPayment = floorNumber(amountPerpayment / includedPersons.length)
                amountsPerPayment.toPay = floorNumber(amountPerpayment / includedPersons.length)
            }
            // Si la persona actual es dueña del gasto actual resto el valor en la persona
            if (owner === person.id) {
                // totalPerPayment = floorNumber(totalPerPayment - amountPerpayment)
                amountsPerPayment.paid = amountPerpayment
            }
            amountsPerPayment.diff = floorNumber(amountsPerPayment.paid - amountsPerPayment.toPay)

            //  Guardar por cada mes el totalPerPayment
            groupTotalPerPaymentByMonth({
                creditTypeInfo,
                totalsPerPayment,
                person,
                totalPerPayment: amountsPerPayment.diff,
                expenseName,
                expenseId: id,
                involvedExpensesPerMonth,
                amountPerpayment,
                amountsPerPayment
            })
        })
    })

    console.log('expensesPerMonth', involvedExpensesPerMonth)
    console.log('totalsPerPayment', totalsPerPayment)

    Object.keys(totalsPerPayment).forEach(paymentKey => {
        totalsPerPayment[paymentKey].forEach(personPayment => {
            const { person, amount } = personPayment
            const d = amountsToGivePerPersonPerPayment[paymentKey]
            const r = amountsToReceivePerPersonPerPayment[paymentKey]

            // if (amount > 0) {
            //     amountsToGivePerPersonPerPayment[paymentKey] = [...(d ?? []), { person, amount }]
            //     amountsToReceivePerPersonPerPayment[paymentKey] = [...(r ?? []), { person, amount: 0 }]
            // } else {
            //     amountsToGivePerPersonPerPayment[paymentKey] = [...(d ?? []), { person, amount: 0 }]
            //     amountsToReceivePerPersonPerPayment[paymentKey] = [
            //         ...(r ?? []),
            //         { person, amount: amount * -1 }
            //     ]
            // }
            if (amount < 0) {
                // La persona debe plata
                amountsToGivePerPersonPerPayment[paymentKey] = [...(d ?? []), { person, amount: amount * -1 }]
                amountsToReceivePerPersonPerPayment[paymentKey] = [...(r ?? []), { person, amount: 0 }]
            } else {
                // La persona debe recibir plata
                amountsToGivePerPersonPerPayment[paymentKey] = [...(d ?? []), { person, amount: 0 }]
                amountsToReceivePerPersonPerPayment[paymentKey] = [...(r ?? []), { person, amount }]
            }
        })
    })

    return {
        amountsToGivePerPersonPerPayment,
        amountsToReceivePerPersonPerPayment,
        involvedExpensesPerMonth
    }
}

const calculateFinalResultCredit = (persons, expenses) => {
    const creditExpenses = expenses.filter(expense => expense.type === CREDIT)

    const {
        amountsToGivePerPersonPerPayment,
        amountsToReceivePerPersonPerPayment,
        involvedExpensesPerMonth
    } = amountOfMoneyToGiveAndReceivePerPersonPerPayment(persons, creditExpenses)

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
        involvedExpensesPerMonth
    }
}

//  Calculo de division de gastos para gastos que son del tipo "CREDITO"
const amountOfMoneyToGiveAndReceivePerPersonPerPaymentV2 = creditExpenses => {
    const amountsToGivePerPersonPerPayment = {}
    const amountsToReceivePerPersonPerPayment = {}

    const amountsPerPersonPerPayment = calculateAmountsPerPersonPerPayment(creditExpenses)
    console.log({ amountsPerPersonPerPayment })
    // Recorrer amountsPerPersonPerPayment, y dividirlo en : cantidad a dar y cantidad a recibir por persona por mes
    Object.keys(amountsPerPersonPerPayment).forEach(paymentKey => {
        amountsPerPersonPerPayment[paymentKey].forEach(personPayment => {
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

const calculateAmountsPerPersonPerPayment = creditExpenses => {
    const amountsPerPersonPerPayment = {}

    creditExpenses.forEach(expense => {
        const { person: owner, includedPersons, amount, creditTypeInfo, id } = expense

        // Total del gasto por cada cuota
        const amountPerpayment = amount / creditTypeInfo.cantPayments

        // Total de la persona por cada cuota
        // Dividir el gasto a las personas que estan incluidas..Anotar este gasto a las personas inlcuidas
        const totalPerPayment = floorNumber(amountPerpayment / includedPersons.length)

        // Gasto del dueño...
        const ownerTotalPerPayment = floorNumber(totalPerPayment - amountPerpayment)

        const includedPersonsTotalsPerPayment = {}
        includedPersons.forEach(person => {
            includedPersonsTotalsPerPayment[person] = totalPerPayment
        })
        includedPersonsTotalsPerPayment[owner] = ownerTotalPerPayment

        //  Guardar por cada mes el totalPerPayment
        groupTotalPerPaymentByMonthV2({
            creditTypeInfo,
            amountsPerPersonPerPayment,
            includedPersonsTotalsPerPayment,
            id
        })
    })

    return amountsPerPersonPerPayment
}

const groupTotalPerPaymentByMonthV2 = ({
    creditTypeInfo,
    amountsPerPersonPerPayment,
    includedPersonsTotalsPerPayment,
    id: expenseId
}) => {
    const { initialMonth, initialYear, cantPayments } = creditTypeInfo

    const paymentDate = currentDate(initialYear, initialMonth)

    for (let i = 1; i <= cantPayments; i++) {
        const paymentKey = generatePaymentKey(paymentDate)

        amountsPerPersonPerPayment[paymentKey] = amountsPerPersonPerPayment[paymentKey] ?? []

        // Buscar en el array del mes (totalsPerMonth[paymentKey]) si ya existe la persona, si ya existe se suma a lo que ya tiene
        Object.keys(includedPersonsTotalsPerPayment).forEach(personId => {
            const personPaymentIndex = amountsPerPersonPerPayment[paymentKey].findIndex(
                personPayment => personPayment.person === personId
            )

            if (personPaymentIndex !== -1) {
                // Si la persona existe
                const personPayment = amountsPerPersonPerPayment[paymentKey][personPaymentIndex]
                personPayment.amount = floorNumber(
                    personPayment.amount + includedPersonsTotalsPerPayment[personId]
                )
                amountsPerPersonPerPayment[paymentKey][personPaymentIndex] = personPayment
            } else {
                // Si no existe la agrego
                amountsPerPersonPerPayment[paymentKey].push({
                    person: personId,
                    amount: includedPersonsTotalsPerPayment[personId]
                })
            }
        })

        amountsPerPersonPerPayment[paymentKey].expenses =
            amountsPerPersonPerPayment[paymentKey].expenses ?? []
        amountsPerPersonPerPayment[paymentKey].expenses.push(expenseId)

        paymentDate.setMonth(paymentDate.getMonth() + 1)
    }
}

// Logica para mostrar de entrada el MES ACTUAL.
// Si el mes actual existe en el arreglo de meses, se muestra ese mes
// Si No existe :
// Hay que fijarse si el primer mes del arreglo es mayor al mes actual,
// Si es mayor, mostrar ese de entrada
// Sino, mostrar el ultimo del arreglo
const currentDateKey = generatePaymentKey(new Date())

const calculateInitialPaymentIndex = creditPayments => {
    let initialPaymentIndex = 0
    if (creditPayments.includes(currentDateKey)) {
        initialPaymentIndex = creditPayments.indexOf(currentDateKey)
    } else {
        const currentDate = generateDateFromPaymentKey(currentDateKey)
        const firstCreditPaymentsDate = generateDateFromPaymentKey(creditPayments[0])

        if (firstCreditPaymentsDate > currentDate) {
            initialPaymentIndex = 0
        } else {
            initialPaymentIndex = creditPayments.length - 1
        }
    }
    return initialPaymentIndex
}

const group = (dateData, expensesInMonth) => {
    const finalResultGrouped = {}

    dateData.forEach(item => {
        const { personaFrom, personaTo, cantidad, porcentajePersonaFrom } = item
        const { id, name } = personaTo

        const personWhoReceives = finalResultGrouped[id] ?? {
            name,
            total: expensesInMonth.totals[id].amounts,
            receipts: []
        }
        personWhoReceives.receipts.push({
            cantidad,
            personaFrom,
            porcentajePersonaFrom
        })
        finalResultGrouped[id] = personWhoReceives
    })
    return finalResultGrouped
}

export {
    calculateFinalResult,
    calculateFinalResultCredit,
    cantExpensesInWhichEachPersonIsIncluded,
    cantOfOwnExpensesPerPerson,
    totalAmountOfExpenses,
    calculateInitialPaymentIndex,
    group
}

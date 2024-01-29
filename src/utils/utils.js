import dayjs from 'dayjs'
import { MONTHS } from '../constants'
import 'dayjs/locale/es-us'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('es-us')

const currencyFormat = num => (num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '0')

const toFloat = num => {
    if (num % 1 === 0) return num

    const fixedNum = num.toFixed(2)
    return parseFloat(fixedNum)
}

const floorNumber = number => {
    // const flooredNumber = Math.floor(number * 100)

    // const formattedNumber = flooredNumber / 100

    // return formattedNumber
    const flooredNumber = Math.floor(Math.abs(number) * 100)

    const formattedNumber = flooredNumber / 100

    return number < 0 ? formattedNumber * -1 : formattedNumber
}

const getPercentage = (number, total) => (number * 100) / total

const roundedNumber = number => Math.round(number)

const getRoundedPercentage = (number, total) => {
    let roundedPercentage = 0
    if (number) {
        const percentage = getPercentage(number, total)
        roundedPercentage = roundedNumber(percentage)
    }
    return roundedPercentage
}

const formatedDate = date => dayjs(date).format('D MMM. YYYY,  HH:mm A')
const relativeDate = date => dayjs().from(dayjs(date), true)

const currentDate = (year, month) => {
    const monthIndex = month - 1

    // JS Date use index for months. Jan -> 0 , Feb-> 1.. etc
    return new Date(year, monthIndex)
}

// UTILS PARA PROCESAR DIVISIONES DE TIPO DE GASTO "CREDITO"

//  Ej key a generar para agosto 2023: --> 7_2023
const generatePaymentKey = paymentDate => {
    const monthIndex = paymentDate.getMonth()
    const year = paymentDate.getUTCFullYear()

    return `${monthIndex}_${year}`
}

const translatePaymentKey = paymentKey => {
    const paymentKeySplited = paymentKey.split('_')
    const [monthIndex, year] = paymentKeySplited

    const monthName = MONTHS[monthIndex].name

    return monthName + ' ' + year
}

const formatedAmount = amount => {
    const floorNumb = floorNumber(amount)

    return floorNumb.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    })
}
export {
    currencyFormat,
    toFloat,
    getPercentage,
    getRoundedPercentage,
    roundedNumber,
    formatedDate,
    relativeDate,
    currentDate,
    generatePaymentKey,
    translatePaymentKey,
    floorNumber,
    formatedAmount
}

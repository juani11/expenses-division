const currencyFormat = num => (num ? '$' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '$0')

const toFloat = num => {
    if (num % 1 === 0) return num

    const fixedNum = num.toFixed(2)
    return parseFloat(fixedNum)
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

export { currencyFormat, toFloat, getPercentage, getRoundedPercentage, roundedNumber }

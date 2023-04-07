const currencyFormat = num => (num ? '$' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '$0')

const toFloat = num => {
    if (num % 1 === 0) return num

    const fixedNum = num.toFixed(2)
    return parseFloat(fixedNum)
}

export { currencyFormat, toFloat }

const currencyFormat = num => (num ? '$' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '$0')

const toFloat = num => {
    const floatValue = parseFloat(num)
    return floatValue % 1 !== 0 ? floatValue.toFixed(2) : floatValue
}
export { currencyFormat, toFloat }

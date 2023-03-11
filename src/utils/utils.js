const currencyFormat = num =>
    num ? '$' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '$0'

export { currencyFormat }

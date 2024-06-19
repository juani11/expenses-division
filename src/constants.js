const CASH = 1
const CREDIT = 2

const JANUARY = {
    id: 0,
    number: 1,
    name: 'enero',
    shortName: 'ene'
}
const FEBRUARY = {
    number: 2,
    name: 'febrero',
    shortName: 'feb'
}
const MARCH = {
    number: 3,
    name: 'marzo',
    shortName: 'mar'
}
const APRIL = {
    number: 4,
    name: 'abril',
    shortName: 'abr'
}
const MAY = {
    number: 5,
    name: 'mayo',
    shortName: 'may'
}
const JUNE = {
    number: 6,
    name: 'junio',
    shortName: 'jun'
}
const JULY = {
    number: 7,
    name: 'julio',
    shortName: 'jul'
}
const AUGUST = {
    number: 8,
    name: 'agosto',
    shortName: 'ago'
}
const SEPTEMBER = {
    number: 9,
    name: 'septiembre',
    shortName: 'sep'
}
const OCTOBER = {
    number: 10,
    name: 'octubre',
    shortName: 'oct'
}
const NOVEMBER = {
    number: 11,
    name: 'noviembre',
    shortName: 'nov'
}
const DECEMBER = {
    number: 12,
    name: 'diciembre',
    shortName: 'dic'
}

const MONTHS = [
    JANUARY,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER
]

// Persons menu items
const PERSONS_LIST = 'listado'
const PERSONS_TOTALS = 'totales'

// Divisions menu items
const DIVISIONS_CASH = 'efectivo'
const DIVISIONS_CREDIT = 'crédito'

const PREV = 'prev'
const NEXT = 'next'

const DOMAIN_BASE_URL = import.meta.env.VITE_DOMAIN_URL

export {
    CASH,
    CREDIT,
    MONTHS,
    PERSONS_LIST,
    PERSONS_TOTALS,
    DIVISIONS_CASH,
    DIVISIONS_CREDIT,
    PREV,
    NEXT,
    DOMAIN_BASE_URL
}

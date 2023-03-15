const persons = [
    { id: 1, name: 'Juani' },
    { id: 2, name: 'Franco' },
    { id: 3, name: 'Julia' },
    { id: 4, name: 'Pedro' },
    { id: 5, name: 'Javier' },
    { id: 6, name: 'Laura' }
]

const expenses = [
    {
        id: '1',
        name: 'fernet',
        amount: 4300,
        person: 2, //   id de la persona que hizo el expense
        excludedPersons: [3] //   ids de las personas que no van a formar parte del expense
    },
    {
        id: '2',
        name: 'gaseosas',
        amount: 1350,
        person: 1,
        excludedPersons: []
    },
    {
        id: '3',
        name: 'patys y pan',
        amount: 5705,
        person: 3,
        excludedPersons: []
    },
    {
        id: '4',
        name: 'fernet',
        amount: 700,
        person: 4,
        excludedPersons: []
    },
    {
        id: '5',
        name: 'gaseosas',
        amount: 2600,
        person: 5,
        excludedPersons: []
    },
    {
        id: '6',
        name: 'patys y pan',
        amount: 3210,
        person: 6,
        excludedPersons: []
    }
]
const group = {
    id: '1',
    name: 'Juntada ATR',
    totalAmountExpenses: 11355,
    persons,
    expenses
}

const divisiones = [
    {
        expense: 1,
        amountPerPerson: 2150,
        includedPersons: [
            { id: 1, name: 'Franco' },
            { id: 2, name: 'Juani' }
        ]
    },
    {
        expense: 2,
        amountPerPerson: 450,
        includedPersons: [
            { id: 1, name: 'Franco' },
            { id: 2, name: 'Juani' },
            { id: 3, name: 'Juli' }
        ]
    },
    {
        expense: 3,
        amountPerPerson: 1901.7,
        includedPersons: [
            { id: 1, name: 'Franco' },
            { id: 2, name: 'Juani' },
            { id: 3, name: 'Juli' }
        ]
    }
]

const cantidadesARecibir = [
    {
        person: { id: 2, name: 'Juani' },
        amount: 0
    },
    {
        person: { id: 1, name: 'Franco' },
        amount: 0
    },
    {
        person: { id: 3, name: 'Juli' },
        amount: 3353.3
    },
    {
        person: { id: 4, name: 'Pedro' },
        amount: 2000
    },
    {
        person: { id: 5, name: 'Rei' },
        amount: 3500
    }
]

const cantidadesAdar = [
    {
        person: { id: 2, name: 'Juani' },
        amount: 5151.7
    },
    {
        person: { id: 1, name: 'Franco' },
        amount: 201.6
    },
    {
        person: { id: 3, name: 'Juli' },
        amount: 0
    },
    {
        person: { id: 6, name: 'Nico' },
        amount: 1750
    },
    {
        person: { id: 7, name: 'Pablo' },
        amount: 1750
    }
]

export { persons, group, expenses, divisiones, cantidadesARecibir, cantidadesAdar }

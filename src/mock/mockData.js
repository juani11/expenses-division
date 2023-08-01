const persons = [
    { id: 1, name: 'Juani' },
    { id: 2, name: 'Franco' },
    { id: 3, name: 'Julia' }
    // { id: 4, name: 'Pedro' },
    // { id: 5, name: 'Javier' },
    // { id: 6, name: 'Maria Laura' }
]

const expenses = [
    {
        id: 1,
        name: 'fernet',
        date: '12/03/2023',
        amount: 4300,
        person: 2, //   id de la persona que hizo el expense
        includedPersons: [1, 2]
    },
    {
        id: 2,
        name: 'gaseosas',
        date: '12/03/2023',
        amount: 1350,
        person: 1,
        includedPersons: [1, 2]
    },
    {
        id: 3,
        name: 'patys y pan',
        date: '12/03/2023',
        amount: 5705,
        person: 3,
        includedPersons: [1, 2]
    },
    // {
    //     id: 4,
    //     name: 'empanadas',
    //     date: '12/03/2023',
    //     amount: 15705,
    //     person: 2,
    //     includedPersons: []
    // },
    // {
    //     id: '4',
    //     name: 'fernet',
    //     amount: 700,
    //     person: 4,
    //     includedPersons: []
    // },
    // {
    //     id: '5',
    //     name: 'gaseosas',
    //     amount: 2600,
    //     person: 5,
    //     includedPersons: []
    // },
    // {
    //     id: '6',
    //     name: 'patys y pan',
    //     amount: 3210,
    //     person: 6,
    //     includedPersons: []
    // }
    {
        id: 23,
        created_at: '2023-07-05T19:17:49.648421+00:00',
        name: 'estacionamiento hotel',
        amount: 25000,
        person: 2, //   Fran
        group_id: 30,
        includedPersons: [
            1, //  Juani
            2, //  Fran
            3 //   Juli
        ],
        type: 'PAYMENTS',
        cant_payments: 3,
        amount_per_payment: 8333.33,
        dates_payments: {
            start_month: 7,
            start_year: 2023
        }
    },

    {
        id: 24,
        created_at: '2023-07-05T19:17:49.648421+00:00',
        name: 'hotel',
        amount: 80000,
        person: 3, //   Juli
        group_id: 30,
        includedPersons: [
            1, //  Juani
            2, //  Fran
            3 //   Juli
        ],
        type: 'PAYMENTS',
        cant_payments: 6,
        amount_per_payment: 13333.33,
        dates_payments: {
            start_month: 7,
            start_year: 2023
        }
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

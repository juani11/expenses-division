export const DATE = 'fecha'
export const PAYER = 'pagador'
export const AMOUNT = 'importe'

const sorterOtions = [
    {
        id: 1,
        name: DATE
    },
    {
        id: 2,
        name: PAYER
    },
    {
        id: 3,
        name: AMOUNT
    }
]
const ExpensesListSorter = ({ sortBy, onChangeSort }) => {
    return (
        <div className='absolute top-3 left-5  focus:ring-1 font-medium'>
            Ordenar por
            <select
                className='ml-3 rounded-xl bg-gray-100 p-2 cursor-pointer focus:ring-1 focus:border-transparent capitalize'
                onChange={onChangeSort}
                value={sortBy}
            >
                {sorterOtions.map(option => (
                    <option key={option.id} value={option.name} className='capitalize'>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ExpensesListSorter

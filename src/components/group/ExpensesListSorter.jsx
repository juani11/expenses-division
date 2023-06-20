import CustomSelect from '../common/CustomSelect'

export const DATE = 'fecha'
export const PAYER = 'pagador'
export const AMOUNT = 'importe'

const sorterOtions = [
    {
        id: 1,
        value: DATE
    },
    {
        id: 2,
        value: PAYER
    },
    {
        id: 3,
        value: AMOUNT
    }
]
const ExpensesListSorter = ({ sortBy, onChangeSort }) => {
    return (
        <div className='absolute top-4 left-4'>
            <CustomSelect
                placeholder='ORDENAR POR'
                options={sorterOtions}
                handleChange={onChangeSort}
                selectedValue={sortBy}
                className='w-52 '
                type='sorter'
            />
        </div>
    )
}

export default ExpensesListSorter

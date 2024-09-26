import { useState } from 'react'
import { totalCashAmountOfExpenses, totalCreditAmountOfExpenses } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import { currencyFormat } from '../../utils/utils'
import Card2 from '../common/Card2'
import Tabs from '../common/Tabs'
import GroupHeaderLoading from './GroupHeaderLoading'
import AddExpense from './expenses/AddExpense'

const Amount = ({ amount, key }) => {
    return (
        <div className='relative'>
            <h3 className='absolute top-2 font-semibold'>$</h3>
            <h1 className={`px-4 text-3xl font-semibold animate-fadeLeft`} key={key}>
                {amount}
            </h1>
        </div>
    )
}

const TotalAmount = () => {
    const expenses = useGroupStore(state => state.expenses)
    const totalCreditAmount = currencyFormat(totalCreditAmountOfExpenses(expenses))
    const totalCashAmount = currencyFormat(totalCashAmountOfExpenses(expenses))

    const [currentSelected, setCurrentSelected] = useState(0)
    const handleCurrentSelected = selected => setCurrentSelected(selected)
    const currentSelectedAmount = currentSelected === 0 ? totalCashAmount : totalCreditAmount

    return (
        <>
            <Tabs
                tabsNames={['efectivo', 'credito']}
                currentSelected={currentSelected}
                handleCurrentSelected={handleCurrentSelected}
                className={'absolute top-4 right-3 w-36'}
            />
            <section className='flex flex-col'>
                <h4 className='text-sm'>Total Gastos</h4>
                <Amount amount={currentSelectedAmount} key={currentSelected} />
            </section>
        </>
    )
}
const GroupHeaderInfo = ({ groupName }) => {
    return (
        <>
            <section>
                <h1 className='text-xl font-semibold'>{groupName}</h1>
            </section>
            <Card2 className={'relative'}>
                <TotalAmount />
                <section className='flex items-center gap-4 mt-4'>
                    <AddExpense />
                    {/* <Button size='sm' color='secondary' variant='light'>
                        agregar persona
                    </Button> */}
                </section>
            </Card2>
        </>
    )
}

const GroupHeader = props => {
    const loading = useGroupStore(state => state.loading)

    return loading ? <GroupHeaderLoading /> : <GroupHeaderInfo {...props} />
}

export default GroupHeader

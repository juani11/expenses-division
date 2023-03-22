import EmptyGroupSVG from '../svg/EmptyGroupSVG'
import AddExpense from './AddExpense'

const EmptyGroup = () => {
    return (
        <div className='flex flex-col justify-center items-center pb-28'>
            <EmptyGroupSVG width={205} height={270} />
            <h1>Aún no hay ningún gasto...</h1>
            <p> Comienza a añadir gastos de distintas personas </p>
            <p>para ver las divisiones</p>
            <div className='mt-9'>
                <AddExpense />
            </div>
        </div>
    )
}

export default EmptyGroup

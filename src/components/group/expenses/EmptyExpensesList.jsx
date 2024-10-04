import { NoDataIllustration } from '../../illustrations/Illustrations'

const EmptyExpensesList = () => {
    console.log('render empty group')
    return (
        <div className='flex flex-col justify-center items-center text-center gap-2 p-10'>
            <NoDataIllustration width={100} height={120} />
            <h2 className='font-semibold'>Aún no hay ningún gasto...</h2>
            <p className=''> Comienza a agregar gastos de distintas personas para ver las divisiones</p>
        </div>
    )
}

export default EmptyExpensesList

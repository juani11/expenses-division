import NoDataSVG from '../../svg/NoDataSVG'

const EmptyExpensesList = () => {
    console.log('render empty group')
    return (
        <div className='flex flex-col justify-center items-center p-10'>
            <NoDataSVG width={100} height={120} />
            <h2>Aún no hay ningún gasto...</h2>
            <p> Comienza a añadir gastos de distintas personas </p>
            <p>para ver las divisiones</p>
        </div>
    )
}

export default EmptyExpensesList

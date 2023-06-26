import { calcularCantidadADarYRecibir, calcularResultadoFinal } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import CardHeader from '../common/CardHeader'
import MoneyAmount from '../common/MoneyAmount'
import Skeleton from '../common/Skeleton/Skeleton'
import SkeletonWrapper from '../common/Skeleton/SkeletonWrapper'
import ArrowSVG from '../svg/ArrowSVG'

const DivisionsLoading = () => {
    return (
        <SkeletonWrapper>
            <div className='h-72'>
                <Skeleton type='BOX' />
            </div>
        </SkeletonWrapper>
    )
}
const DivisionsList = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)
    const loading = useGroupStore(state => state.loading)

    const { cantidadesADar, cantidadesARecibir } = calcularCantidadADarYRecibir(persons, expenses)
    const resultados = calcularResultadoFinal(cantidadesADar, cantidadesARecibir)

    return (
        <>
            <CardHeader title={'divisiones'} />

            {loading ? (
                <DivisionsLoading />
            ) : (
                <ul className=' py-5 px-2 rounded-xl '>
                    {resultados.map((division, index) => (
                        <li key={index} className='shadow bg-white rounded mb-3 hover:bg-gray-50 p-4'>
                            <div className='flex items-center '>
                                <h5 className='m-0 uppercase  text-gray-400'>{division.personaFrom.name}</h5>
                            </div>

                            <div className='flex justify-between items-center'>
                                <div className='px-1 rounded-md'>
                                    <ArrowSVG />
                                </div>
                                <h5 className='m-0 uppercase w-20 text-gray-400'>
                                    {division.personaTo.name}
                                </h5>
                                <MoneyAmount
                                    amount={division.cantidad}
                                    className='bg-primary text-white font-bold'
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default DivisionsList

// {/* <li
// key={index}
// className='flex justify-between items-center mb-3 hover:bg-gray-50 p-3'
// >
// <h5 className='m-0 capitalize w-10 text-gray-400'>{division.personaFrom.name}</h5>
// <div className='flex flex-col items-center '>
//     {/* <ArrowSVG /> */}
//     <h4 className='m-0'></h4>
//     <h4 className='m-0 relative max-w-fit bg-avatar3 rounded-xl text-white text-center py-2 pl-3  '>
//         <span className='absolute text-xs top-2'>$</span>
//         <span className='px-3'>{`${currencyFormat(division.cantidad)}`}</span>
//     </h4>
// </div>

// <h5 className='m-0 capitalize w-10  text-gray-400'>{division.personaTo.name}</h5>

// {/* <ExpenseCost cost={division.cantidad} /> */}

// {/* <div className='bg-primary-300 w-24 rounded-2xl text-primary'>
//     <h4 className='m-2 text-center'>{currencyFormat(division.cantidad)}</h4>
// </div> */}
// </li> */}

import { calcularCantidadADarYRecibir, calcularResultadoFinal } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import CardHeader from '../common/CardHeader'
import MoneyAmount from '../common/MoneyAmount'
import Skeleton from '../common/Skeleton/Skeleton'
import SkeletonWrapper from '../common/Skeleton/SkeletonWrapper'
import PeopleCoffeSVG from './../svg/PeopleCofeeSVG'

const DivisionsLoading = () => {
    return (
        <SkeletonWrapper>
            <div className='h-72'>
                <Skeleton type='BOX' />
            </div>
        </SkeletonWrapper>
    )
}

const EmptyDivisionsList = () => {
    return (
        <div className='flex flex-col justify-center items-center p-10'>
            <PeopleCoffeSVG width={160} height={180} />
            <h4 className='text-center'>Aún no hay deudas...</h4>
            <p className='text-center'> Aquí verás cuánto le corresponde pagar a cada integrante</p>
        </div>
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
                <ul className='shadow py-5 px-2 rounded bg-white'>
                    {resultados.length === 0 ? (
                        <EmptyDivisionsList />
                    ) : (
                        resultados.map((division, index) => (
                            <li key={index} className=' bg-white rounded mb-3 hover:bg-gray-50 p-4'>
                                <div className='flex gap-6 items-center '>
                                    <div className='flex gap-5 items-center'>
                                        <div className='flex flex-col gap-1'>
                                            <h5 className='m-0 capitalize w-20 '>
                                                {division.personaFrom.name}
                                            </h5>
                                            <div className='flex items-center gap-1'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='currentColor'
                                                    className='w-6 h-6 bg-gray-100 rounded p-1'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                                                    />
                                                </svg>

                                                <h5 className='m-0 capitalize ml-auto text-gray-400'>
                                                    {division.personaTo.name}
                                                </h5>
                                            </div>
                                        </div>

                                        {/* <div className='ml-auto flex gap-2 items-end'>
                                        <AvatarSVG
                                            width={22}
                                            height={22}
                                            backgroundColor={'bg-primary-300'}
                                        />
                                        <div className='flex flex-col'>
                                            <h5 className='m-0 capitalize'>{division.personaTo.name}</h5>
                                        </div>
                                    </div> */}
                                    </div>

                                    <div className='ml-auto'>
                                        <MoneyAmount
                                            amount={division.cantidad}
                                            className='bg-primary  text-white font-bold'
                                        />
                                    </div>
                                </div>

                                {/* <div className='flex justify-between items-center'>
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
                            </div> */}
                            </li>
                        ))
                    )}
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

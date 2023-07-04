import { calcularResultadoFinal } from '../../logic/logic'
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
            <h4 className='text-center'>Aún no hay divisiones...</h4>
            <p className='text-center'> Aquí verás cuánto le corresponde pagar a cada integrante</p>
        </div>
    )
}

const DivisionsList = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)
    const loading = useGroupStore(state => state.loading)

    const resultados = calcularResultadoFinal(persons, expenses)

    return (
        <>
            <CardHeader title={'divisiones'} />

            {loading ? (
                <DivisionsLoading />
            ) : (
                <ul className='shadow py-5 px-2 rounded bg-white dark:bg-slate-800  dark:border dark:border-slate-700'>
                    {resultados.length === 0 ? (
                        <EmptyDivisionsList />
                    ) : (
                        resultados.map((division, index) => (
                            <li
                                key={index}
                                className=' rounded mb-3 hover:bg-gray-50 p-4 dark:hover:bg-slate-600'
                            >
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
                                                    className='w-6 h-6 bg-gray-100 rounded p-1 dark:bg-slate-600'
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
                                    </div>
                                    <div className='ml-auto'>
                                        <MoneyAmount
                                            amount={division.cantidad}
                                            className='bg-primary  text-white font-bold'
                                        />
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </>
    )
}

export default DivisionsList

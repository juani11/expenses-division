import { formatedAmount } from '../../../../utils/utils'

const PersonStats = ({ personName, totalToPay, totalDiff, positiveDiff, negativeDiff }) => {
    return (
        <div className='flex justify-around gap-4 py-4'>
            <section id='total' className=' flex flex-col gap-2'>
                <span className='flex gap-2 items-center text-sm'>
                    Total de gastos{' '}
                    {/* <Tooltip
                        title={
                            'Es el monto total acumulado que le corresponde pagar a la persona por  todos los gastos en los que está involucrado'
                        }
                        component={TableHeaderInfo}
                        withButtons={false}
                        position={'left'}
                        closable
                    /> */}
                </span>
                <span className='text-3xl font-bold'>{formatedAmount(totalToPay)}</span>
            </section>

            <section id='total_detail' className='grid gap-2'>
                <div className='flex flex-col gap-1'>
                    <div className='text-sm'>
                        <span className='font-bold capitalize'>{personName}</span>{' '}
                        <span className='text-sm '>{totalDiff < 0 ? 'debe dar' : 'debe recibir'}</span>
                    </div>
                    <span
                        className={`text-xl font-bold ${
                            totalDiff < 0 ? 'bg-red-500' : totalDiff > 0 && 'bg-green-500'
                        } text-white px-2 py-0.5 text-center rounded`}
                    >
                        {formatedAmount(Math.abs(totalDiff))}
                    </span>
                </div>

                <div className='flex items-center gap-3'>
                    <div className='flex flex-col  gap-1'>
                        <span className='text-xs'>Total a recibir</span>
                        <span className='text-sm text-green-400 px-1'>{formatedAmount(positiveDiff)}</span>
                    </div>
                    <div className='flex flex-col  gap-1'>
                        <span className='text-xs'>Total a dar</span>
                        <span className='text-sm text-red-400 px-1 '>{formatedAmount(negativeDiff)}</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default PersonStats

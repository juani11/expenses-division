import EmptyGroup from '../components/group/EmptyGroup'
import MoneySVG from '../components/svg/MoneySVG'

const group = {
    id: '1',
    name: 'Juntada ATR',
    totalExpenses: 0,
    expenses: []
}

const Group = () => {
    return (
        <>
            {/* // GROUP HEADER INFORMATION */}
            <section>
                <div className='flex flex-col font-primary'>
                    <div className='flex items-center w-96 justify-center gap-5 mt-6'>
                        <span className='shrink-0 border bg-primary text-white font-bold border-white rounded-full h-16 w-16 flex justify-center items-center'>
                            {group.name.charAt(0)}
                        </span>
                        <h2>{group.name}</h2>
                    </div>

                    <div className='flex items-center w-96 justify-evenly mt-6'>
                        <div className='flex flex-col items-center'>
                            <h4 className='m-0'>Total Gastos</h4>
                            <div className='flex justify-start items-center'>
                                <div className='shrink-0'>
                                    <MoneySVG width={80} height={50} />
                                </div>
                                <h1>${group.totalExpenses}</h1>
                            </div>
                        </div>

                        <div className='flex flex-col items-center'>
                            <h4 className='m-0'>Personas</h4>
                            <div className='flex justify-start items-center '>
                                {/* <div className='shrink-0'>
                            <AvatarSVG width={80} height={50} />
                        </div> */}
                                <h1>0</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* // GROUP INFORMATION */}
            <section className='flex justify-center font-primary bg-gray-50 '>
                {group.expenses.length === 0 ? (
                    <EmptyGroup />
                ) : (
                    <h3>Se muestra data del grupo</h3>
                )}
            </section>
        </>
    )
}

export default Group

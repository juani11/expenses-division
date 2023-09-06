import { currencyFormat } from '../../../utils/utils'
import Avatar from '../../common/Avatar'

const totals = [
    {
        person: 'Juli',
        amount: 5705,
        cant: 1
    },
    {
        person: 'Franco',
        to: 'Juani',
        amount: 4300,
        cant: 1
    },
    {
        person: 'Juani',
        amount: 1350,
        cant: 1
    }

    // {
    //     from: 'Franco',
    //     to: 'Juani',
    //     amount: 5400
    // }
]
const TotalsList = () => {
    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Totales</h3>
            </div>
            <ul className='shadow-lg bg-white p-5 rounded '>
                {totals.map((total, index) => (
                    <li key={index} className='flex items-center justify-between gap-2'>
                        <div className='flex justify-center items-center gap-3'>
                            <Avatar size={'sm'} color={'bg-secondary'}>
                                {total.person.charAt(0)}
                            </Avatar>
                            <div className='flex flex-col'>
                                <h4 className='m-0'>{total.person}</h4>
                            </div>
                        </div>
                        <div>
                            <h3>{`${currencyFormat(total.amount)}`}</h3>
                        </div>
                        <div className='flex items-center justify-center gap-3'>
                            <div className='flex-grow'>
                                <h4 className='m-0'>{`${total.cant} gasto`}</h4>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TotalsList

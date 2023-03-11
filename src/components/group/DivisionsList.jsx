import { currencyFormat } from '../../utils/utils'
import Avatar from '../common/Avatar'
import ArrowSVG from '../svg/ArrowSVG'

const divisions = [
    {
        from: 'Juani',
        to: 'Franco',
        amount: 515
    },
    {
        from: 'Juani',
        to: 'Juli',
        amount: 1920
    }
    // {
    //     from: 'Franco',
    //     to: 'Juani',
    //     amount: 5400
    // }
    // {
    //     from: 'Franco',
    //     to: 'Juani',
    //     amount: 5400
    // }
]
const DivisionsList = () => {
    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Divisiones</h3>
            </div>
            <ul className='shadow-md bg-white p-5 rounded-3xl border border-secondary '>
                {divisions.map((division, index) => (
                    <li key={index} className='grid grid-cols-3'>
                        <div className='flex items-center  gap-3'>
                            <Avatar size={'sm'} color={'bg-secondary'}>
                                {division.from.charAt(0)}
                            </Avatar>
                            <div className='flex flex-col'>
                                <h4 className='m-0'>{division.from}</h4>
                            </div>
                        </div>
                        <div className='flex flex-col items-center '>
                            <h3 className='m-3'>{`${currencyFormat(division.amount)}`}</h3>
                            <ArrowSVG />
                        </div>
                        <div className='flex items-center justify-center gap-3'>
                            <Avatar size={'sm'} color={'bg-secondary'}>
                                {division.to.charAt(0)}
                            </Avatar>
                            <div className='flex-grow'>
                                <h4 className='m-0'>{division.to}</h4>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DivisionsList

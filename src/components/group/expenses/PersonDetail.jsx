import Amount from '../../common/Amount'

const PersonDetail = ({ personName, costPerPerson, children }) => {
    return (
        <li className='flex justify-between items-center gap-6 py-2'>
            <h4 className={'font-medium text-sm capitalize w-36'}>{personName}</h4>
            {costPerPerson && <Amount amount={costPerPerson} className='font-bold text-sm' />}
            {children}
        </li>
    )
}
export default PersonDetail

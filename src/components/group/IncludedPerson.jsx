import Button from '../common/Button'
import PersonDetail from './PersonDetail'
const IncludedPerson = ({ person, cost, callback }) => {
    const handleClick = () => {
        callback(person.id)
    }
    return (
        <PersonDetail personName={person} cost={cost}>
            {/* <button className=' text-white font-bold bg-red-500 px-4 hover:bg-red-300 '>Excluir</button> */}
            <Button size='xs' onClick={handleClick}>
                Excluir
            </Button>
        </PersonDetail>
    )
}

export default IncludedPerson

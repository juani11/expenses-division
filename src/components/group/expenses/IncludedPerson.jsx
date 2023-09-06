import Button from '../../common/Button'
import PersonDetail from './PersonDetail'
const IncludedPerson = ({ person, cost, callback }) => {
    const handleClick = () => {
        callback(person.id)
    }
    return (
        <PersonDetail personName={person} cost={cost}>
            <Button size='sm' onClick={handleClick}>
                Excluir
            </Button>
        </PersonDetail>
    )
}

export default IncludedPerson

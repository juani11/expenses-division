import Button from '../../common/Button'
import PersonDetail from './PersonDetail'

const ExcludedPerson = ({ person, personName, callback }) => {
    const handleClick = () => {
        callback(person)
    }
    return (
        <PersonDetail personName={personName}>
            <Button size='xs' onClick={handleClick}>
                Incluir
            </Button>
        </PersonDetail>
    )
}

export default ExcludedPerson

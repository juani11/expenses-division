import Button from '../common/Button'
import PersonDetail from './PersonDetail'

const ExcludedPerson = ({ personName }) => {
    return (
        <PersonDetail personName={personName}>
            {/* <button className='rounded-3xl px-4 text-white font-bold bg-green-400 hover:bg-green-300 '>
                Incluir
            </button> */}
            <Button size='xs'>Incluir</Button>
        </PersonDetail>
    )
}

export default ExcludedPerson

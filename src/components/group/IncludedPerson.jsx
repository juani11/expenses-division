import Button from '../common/Button'
import PersonDetail from './PersonDetail'
const IncludedPerson = ({ personName, cost }) => {
    return (
        <PersonDetail personName={personName} cost={cost}>
            {/* <button className='rounded-3xl text-white font-bold bg-red-500 px-4 hover:bg-red-300 '>
                Excluir
            </button> */}
            <Button size='xs'>Excluir</Button>
        </PersonDetail>
    )
}

export default IncludedPerson

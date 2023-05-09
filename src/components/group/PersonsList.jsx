import { useGroupStore } from '../../store/store'
import AvatarSVG from '../svg/AvatarSVG'

const PersonsList = () => {
    const persons = useGroupStore(state => state.persons)

    return (
        <div className='shadow-lg bg-white py-5 px-2 rounded-xl animate-fade '>
            <ul className=''>
                {persons.map(({ id, name }) => (
                    <li key={id} className='hover:bg-gray-50 rounded-xl p-3 my-2 border-b '>
                        <div className='flex gap-5 items-end mb-2'>
                            <AvatarSVG width={30} height={30} fillColor='text-primary' />

                            <h5 className='m-0'>{name}</h5>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default PersonsList

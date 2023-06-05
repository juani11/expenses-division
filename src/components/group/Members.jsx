import { useRef } from 'react'
import useNewGroupFormContext from '../../hooks/useNewGroupFormContext'
import Input from '../Input'
import Button from '../common/Button'
import CloseSVG from '../svg/CloseSVG'

const Member = ({ member, removeMember }) => {
    return (
        <li className='flex justify-between items-center py-3 px-1 capitalize'>
            {member}

            <Button className='py-1 px-2 ' onClick={() => removeMember(member)}>
                <CloseSVG color='white' width={20} height={20} />
            </Button>
        </li>
    )
}

const Members = () => {
    const newGroupFormContext = useNewGroupFormContext()
    const { members, addMember, removeMember } = newGroupFormContext

    const memberRef = useRef()

    const handleClick = () => {
        const member = memberRef.current.value

        memberRef.current.value = ''
        memberRef.current.focus()

        if (member !== '') addMember(member)
    }

    const cantMembers = members.length

    return (
        <div className='w-1/2 flex flex-col gap-2 px-10'>
            <div className='w-full '>
                <div className='flex justify-between items-end'>
                    <div className='w-2/3'>
                        <Input label='Participantes' reference={memberRef} />
                    </div>

                    <Button onClick={handleClick}>añadir</Button>
                </div>
            </div>
            <div className='w-full '>
                <div className='bg-gray-100 rounded-lg '>
                    {cantMembers === 0 ? (
                        <p className='p-3'>Aún no agregaste participantes...</p>
                    ) : (
                        <>
                            <p className='p-3 capitalize '>
                                {`${cantMembers} ${cantMembers === 1 ? 'participante' : 'participantes'}`}
                            </p>
                            <ul className='p-3'>
                                {members.map(member => (
                                    <Member key={member} member={member} removeMember={removeMember} />
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Members

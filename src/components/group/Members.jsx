import { useRef } from 'react'
import useNewGroupFormContext from '../../hooks/useNewGroupFormContext'
import Input from '../Input'
import Button from '../common/Button'
import { CloseIcon } from '../icons/icons'

const Member = ({ member, removeMember }) => {
    return (
        <li className='flex justify-between items-center py-3 px-1 capitalize'>
            {member}

            <Button size='xxs' onClick={() => removeMember(member)}>
                <CloseIcon width={20} height={20} />
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
        <div className='flex flex-col gap-2 px-10 md:w-1/2'>
            <div className='w-full '>
                <div className='flex justify-between items-end'>
                    <div className='w-full mt-10 md:mt-0 md:w-2/3'>
                        <Input label='Participantes' reference={memberRef} />
                    </div>

                    <Button size='lg' type='button' onClick={handleClick}>
                        agregar
                    </Button>
                </div>
            </div>
            <div className='w-full '>
                <div className='bg-gray-100 rounded-lg dark:bg-slate-800 '>
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

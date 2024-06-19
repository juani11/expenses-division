/*

Componente que muestra las opciones globales que la persona actual puede realizar con el grupo

  Dependiendo de si la persona:

    - Tiene o no sesion iniciada
    - y de si ya tiene o no el grupo vinculado a su perfil */

import useAuth from '../../hooks/useAuth'
import { useGroupStore } from '../../store/store'
import { CheckIcon } from '../icons/icons'
import CoppyToClipboardBtn from './CoppyToClipboardBtn'
import SyncWithCurrentUserProfileBtn from './SyncWithCurrentUserProfileBtn'

const GroupHeaderOtions = () => {
    const auth = useAuth()
    const info = useGroupStore(state => state.info)

    const { session, groupsPublicId, addGroup } = auth

    const currentGroup = info.publicId
    const personAlreadyHasGroupInHisProfile = groupsPublicId?.includes(currentGroup)

    const className = `flex gap-1  ${personAlreadyHasGroupInHisProfile && 'flex-col gap-4'}`
    return (
        <section className={className}>
            {session &&
                (personAlreadyHasGroupInHisProfile ? (
                    <h6 className='flex items-center gap-1 m-0 dark:text-gray-300'>
                        <CheckIcon className={'text-green-300'} /> Grupo vinculado a mi perfil
                    </h6>
                ) : (
                    <SyncWithCurrentUserProfileBtn userEmail={session?.email} addGroup={addGroup} />
                ))}
            <CoppyToClipboardBtn />
        </section>
    )
}

export default GroupHeaderOtions

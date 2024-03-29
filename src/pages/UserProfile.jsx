import { navigate } from 'wouter/use-location'
import UserGroupsLoading from '../components/UserGroupsLoading'
import Button from '../components/common/Button'
import { AtIcon } from '../components/icons/icons'
import { EmptyGroupsIlustration } from '../components/illustrations/Illustrations'
import useAuth from '../hooks/useAuth'
import { formatedDate } from '../utils/utils'
import CardHeader from '../components/common/CardHeader'
import { useEffect, useState } from 'react'
import { getUserGroups } from '../services/services'

const EmptyUserGroups = () => {
    return (
        <div className='flex flex-col items-center justify-center pt-20 gap-8 mb-20  rounded'>
            <EmptyGroupsIlustration width={270} height={220} />
            <h3>Aún no contás con grupos...</h3>
        </div>
    )
}

const UserGroupsList = ({ userGroups }) => {
    return (
        <ul className='pt-4 '>
            {userGroups?.map(userGroup => (
                <UserGroupsListItem key={userGroup.publicId} userGroup={userGroup} />
            ))}
        </ul>
    )
}
const UserGroupsListItem = ({ userGroup }) => {
    const { publicId, name, createdAt, userIsOwner } = userGroup

    return (
        <li
            key={publicId}
            className='py-4 px-2 rounded flex hover:bg-gray-50 dark:hover:bg-slate-800  cursor-pointer'
            onClick={() => navigate(`/group/${publicId}`)}
        >
            <div className='flex items-center gap-10'>
                <div>
                    <h4 className='m-0'>{name}</h4>
                    <p className='text-xs'>{formatedDate(createdAt)}</p>
                </div>
                {userIsOwner && (
                    <span className='px-2 py-1 rounded bg-primary-200 text-primary font-bold text-xs '>
                        creado por mi
                    </span>
                )}
            </div>
        </li>
    )
}

const UserGroupsContainer = ({ userGroups }) => {
    return userGroups?.length === 0 ? (
        <EmptyUserGroups />
    ) : (
        <>
            {/* <ExpensesListSorter sortBy={sortBy} onChangeSort={handleChange} /> */}
            <UserGroupsList userGroups={userGroups} />
        </>
    )
}
const UserProfile = () => {
    const auth = useAuth()

    const { session, signOut } = auth

    const [loadingUserGroups, setLoadingUserGroups] = useState(false)
    const [userGroups, setUserGroups] = useState(null)

    useEffect(() => {
        console.log('Recuperar grupo del usuario actual...')
        setLoadingUserGroups(true)
        getUserGroups(session.email)
            .then(res => {
                console.log('res dentro de getUserGroup() ', res)
                // const [groupData] = res
                setUserGroups(res)
            })
            .catch(error => {
                console.log('error dentro de getUserGroups()', error)
            })
            .finally(() => setLoadingUserGroups(false))
    }, [])

    return (
        <div className='md:max-w-screen-md lg:max-w-screen-lg md:mx-auto mx-10 h-screen flex flex-col gap-20 pt-20'>
            <section id='userInfo' className='pt-10'>
                <header className='flex items-center gap-6'>
                    <img
                        className='rounded-full'
                        src={session?.avatar_url}
                        alt='Google user avatar'
                        width={80}
                        height={80}
                    />

                    <div className='flex flex-col items-start gap-1'>
                        <h3 className='m-0'>{session?.full_name}</h3>
                        <div className='flex items-center gap-1 opacity-75 mb-1'>
                            <AtIcon width={'1rem'} />
                            <p className='text-xs'>{session?.email}</p>
                        </div>
                    </div>
                </header>
            </section>

            <section id='userGroups'>
                {loadingUserGroups ? (
                    <UserGroupsLoading />
                ) : (
                    <>
                        <CardHeader title={'Mis grupos'}>
                            <Button onClick={() => navigate('/newGroup')}>Nuevo grupo</Button>
                        </CardHeader>

                        <UserGroupsContainer userGroups={userGroups} />
                    </>
                )}
            </section>
        </div>
    )
}

export default UserProfile

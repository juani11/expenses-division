import { useEffect } from 'react'
import { useRoute } from 'wouter'
import DivisionsList from '../components/group/DivisionsList'
import GroupHeader from '../components/group/GroupHeader'
import Persons from '../components/group/Persons'
import { useGroupStore } from '../store/store'
import Expenses from './../components/group/Expenses'

const Group = () => {
    const [, params] = useRoute('/group/:id')
    const { id: groupId } = params

    const fetch = useGroupStore(state => state.fetch)
    const error = useGroupStore(state => state.error)

    const group = useGroupStore(state => state.info)
    const persons = useGroupStore(state => state.persons)

    const groupName = group?.name
    const cantPersons = persons?.length

    console.log(group)
    console.log(persons)
    console.log(`error en componente , ${error}`)

    useEffect(() => {
        fetch(groupId)
    }, [])

    return (
        <div className='h-screen font-primary'>
            {/* // GROUP HEADER INFORMATION */}
            <section className='md:mx-20 2xl:mx-40 md:mt-14 mt-10 rounded-lg'>
                <GroupHeader groupName={groupName} cantPersons={cantPersons} />
            </section>

            {/* // GROUP INFORMATION */}
            <section className='w-full'>
                <div className='rounded-lg grid grid-cols-1 gap-14 bg-gray-50 px-6 lg:px-24 2xl:px-72 py-20 md:rounded-l-[150px] lg:grid-cols-4 '>
                    <div className=''>
                        <Persons />
                    </div>
                    <div className='gap-5 lg:col-span-2'>
                        <div className=''>
                            <Expenses />
                        </div>
                    </div>
                    <div className=' '>
                        <DivisionsList />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Group

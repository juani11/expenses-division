import { useEffect } from 'react'
import { useRoute } from 'wouter'
import Divisions from '../components/group/Divisions'
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
        <div className=' '>
            {/* // GROUP HEADER INFORMATION */}
            <header className='md:pt-24 w-[87%] 2xl:w-[78%] mx-auto'>
                <GroupHeader groupName={groupName} cantPersons={cantPersons} />
            </header>

            {/* // GROUP INFORMATION */}
            <main className='bg-gray-50 dark:bg-slate-900 md:rounded-l-[150px]'>
                <div className='grid grid-cols-1 gap-14 py-14 lg:grid-cols-4 w-[87%] 2xl:w-[78%] mx-auto'>
                    <Persons />
                    <section id='expenses' className='gap-5 lg:col-span-2'>
                        <Expenses />
                    </section>
                    <Divisions />
                </div>
            </main>
        </div>
    )
}

export default Group

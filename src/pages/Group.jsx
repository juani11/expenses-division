import { useEffect } from 'react'
import { useRoute } from 'wouter'
import DivisionsList from '../components/group/DivisionsList'
import EmptyGroup from '../components/group/EmptyGroup'
import GroupHeader from '../components/group/GroupHeader'
import Persons from '../components/group/Persons'
import { useGroupStore } from '../store/store'
import Expenses from './../components/group/Expenses'

const Loading = () => {
    console.log('loading..')
    return 'Loading...'
}

const Group = () => {
    const [match, params] = useRoute('/group/:id')
    const { id: groupId } = params

    const fetch = useGroupStore(state => state.fetch)
    const loading = useGroupStore(state => state.loading)
    const error = useGroupStore(state => state.error)

    const group = useGroupStore(state => state.info)
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)

    const groupName = group?.name
    const cantPersons = persons?.length

    const personsName = persons?.map(person => person.name)

    console.log(group)
    console.log(persons)
    console.log(`error en componente , ${error}`)

    useEffect(() => {
        fetch(groupId)
    }, [])

    return loading ? (
        <Loading />
    ) : (
        <div className='h-screen font-primary'>
            {/* // GROUP HEADER INFORMATION */}
            <section className='md:mx-20 2xl:mx-40 mt-20'>
                <GroupHeader groupName={groupName} cantPersons={cantPersons} />
            </section>

            {/* // GROUP INFORMATION */}
            <section className='w-full'>
                {!expenses ? (
                    <div className='flex justify-center'>
                        <EmptyGroup />
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-4 gap-14 bg-gray-50 px-28 2xl:px-72 py-20 rounded-l-[150px] '>
                            <div className=''>
                                {/* <PersonStatistics personsName={personsName} /> */}
                                <Persons />
                            </div>
                            <div className=' gap-5 col-span-2'>
                                <div className=''>
                                    <Expenses />
                                </div>
                            </div>
                            <div className=''>
                                <DivisionsList />
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default Group

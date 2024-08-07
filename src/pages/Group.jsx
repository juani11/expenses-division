import { useEffect } from 'react'
import { useLocation, useRoute } from 'wouter'
import Divisions from '../components/group/divisions/Divisions'
import GroupHeader from '../components/group/GroupHeader'
import Persons from '../components/group/persons/Persons'
import { useGroupStore } from '../store/store'
import Expenses from '../components/group/expenses/Expenses'
import usePageSEO from '../hooks/usePageSEO'
import { getGroup } from '../services/services'
import { InvalidGroupError } from '../errors/errors'
const Group = () => {
    const [, params] = useRoute('/group/:id')

    const { id: groupId } = params

    const [, setLocation] = useLocation()
    // const fetch = useGroupStore(state => state.fetch)
    const error = useGroupStore(state => state.error)

    const group = useGroupStore(state => state.info)
    const setGroupData = useGroupStore(state => state.setGroupData)
    const setLoadingGroupData = useGroupStore(state => state.setLoadingGroupData)
    const persons = useGroupStore(state => state.persons)

    const setOpenGraphDescription = usePageSEO()

    const groupName = group?.name
    const cantPersons = persons?.length

    console.log(group)
    console.log(persons)
    console.log(`error en componente , ${error}`)

    useEffect(() => {
        // fetch(groupId)
        setLoadingGroupData()
        getGroup(groupId)
            .then(res => {
                console.log('res dentro de getGroup() ', res)
                const [groupData] = res
                setGroupData(groupData)
            })
            .catch(error => {
                if (error instanceof InvalidGroupError) {
                    console.log('error dentro de getGroup()', error)
                    setLocation(`/notfound`)
                }
            })
    }, [])

    useEffect(() => {
        // SET OPEN GRAPH META
        if (groupName) {
            setOpenGraphDescription(
                `¡Hola!. Ya podés acceder al grupo "${groupName}" y comenzar a agregar gastos!`
            )
        }
    }, [groupName])

    return (
        <>
            {/* // GROUP HEADER INFORMATION */}
            <header className='pt-20 md:pt-24 w-[87%] 2xl:w-[78%] mx-auto'>
                <GroupHeader groupName={groupName} cantPersons={cantPersons} />
            </header>

            {/* // GROUP INFORMATION */}
            <main className='bg-gray-50 dark:bg-slate-900 md:rounded-l-[150px]'>
                <div className='grid grid-cols-1 gap-14 py-14 lg:grid-cols-4 w-[87%] 2xl:w-[78%] mx-auto '>
                    <Persons />
                    <section id='expenses' className='gap-5 lg:col-span-2'>
                        <Expenses />
                    </section>
                    <Divisions />
                </div>
            </main>
        </>
    )
}

export default Group

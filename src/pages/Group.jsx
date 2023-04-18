import DivisionsList from '../components/group/DivisionsList'
import EmptyGroup from '../components/group/EmptyGroup'
import GroupHeader from '../components/group/GroupHeader'
import Persons from '../components/group/Persons'
import { useGroupStore } from '../store/store'
import Expenses from './../components/group/Expenses'

const Group = () => {
    const group = useGroupStore(state => state.info)
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)

    const groupName = group.name
    const cantPersons = persons.length

    return (
        <div className='h-screen font-primary'>
            {/* // GROUP HEADER INFORMATION */}
            <section className='md:mx-20 2xl:mx-40 mt-20'>
                <GroupHeader groupName={groupName} cantPersons={cantPersons} />
            </section>

            {/* // GROUP INFORMATION */}
            <section className='w-full'>
                {expenses.length === 0 ? (
                    <div className='flex justify-center'>
                        <EmptyGroup />
                    </div>
                ) : (
                    <div className='grid grid-cols-2 gap-5 bg-gray-50  md:p-20 rounded-l-[150px] '>
                        <div className=''>
                            <Expenses />
                        </div>
                        <div className='w-[500px] justify-self-center'>
                            <Persons />
                            <DivisionsList />
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Group

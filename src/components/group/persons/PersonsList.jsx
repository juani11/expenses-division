import { cantExpensesInWhichEachPersonIsIncluded } from '../../../logic/logic'
import { useGroupStore } from '../../../store/store'
import Card from '../../common/Card'
import { AvatarIcon } from '../../icons/icons'

const colors = ['bg-primary-300', 'bg-red-300', 'bg-yellow-500']

const PersonsList = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)

    const cantExpensesPerPerson = cantExpensesInWhichEachPersonIsIncluded(expenses)

    return (
        <Card className='animate-fade'>
            <ul>
                {persons.map(({ id, name }, index) => {
                    // const avatarColor = colors[Math.floor(Math.random() * colors.length)]
                    const cantExpensesPersonIsInlcuded = cantExpensesPerPerson[id] ?? 0
                    const avatarColor = colors[0]
                    return (
                        <li
                            key={id}
                            className='hover:bg-gray-50 rounded-xl p-3 my-2 dark:hover:bg-slate-600  '
                        >
                            <div className='flex gap-5 items-center mb-2'>
                                <AvatarIcon width={30} height={30} backgroundColor={avatarColor} />

                                <div className='flex flex-col'>
                                    <h5 className='m-0 capitalize'>{name}</h5>
                                    <h6 className='m-0 text-gray-400'>{`Incluido en ${cantExpensesPersonIsInlcuded} ${
                                        cantExpensesPersonIsInlcuded === 1 ? 'gasto' : 'gastos'
                                    }`}</h6>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Card>
    )
}
export default PersonsList

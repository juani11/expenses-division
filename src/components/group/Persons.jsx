import { useState } from 'react'
import { expensesPerPerson } from '../../logic/logic'
import { useGroupStore } from '../../store/store'
import { currencyFormat } from '../../utils/utils'
import PersonsMenu from './PersonsMenu'
import AvatarSVG from './../svg/AvatarSVG'
import Button from '../common/Button'
import UserSVG from './../svg/UserSVG'

const Persons = () => {
    const persons = useGroupStore(state => state.persons)
    const expenses = useGroupStore(state => state.expenses)
    const totalAmountExpenses = useGroupStore(state => state.totalAmountExpenses)

    const totales = expensesPerPerson(expenses)

    const [menuOptionSelected, setMenuOptionSelected] = useState('listado')
    const handleClick = setMenuOptionSelected

    const PersonsList = () => {
        return (
            <div className='shadow-lg bg-white py-5 px-2 rounded-xl '>
                <ul className=''>
                    {persons.map((person, index) => {
                        return (
                            <li key={index} className=' hover:bg-gray-50 rounded-xl p-3 my-2 '>
                                <div className='flex gap-5 items-end mb-2'>
                                    <AvatarSVG width={30} height={30} />
                                    <h5 className='m-0'>{person.name}</h5>
                                    {/* <ExpenseCost cost={`${roundedPercentaje}%`} /> */}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    const PersonsTotals = () => {
        return (
            <div className='shadow-lg bg-white py-5 px-2 rounded-xl '>
                <ul className=''>
                    {persons.map((person, index) => {
                        const personAmount = totales[person.id]?.amount

                        let personRoundedAmountPercentaje = 0

                        if (personAmount) {
                            const personAmountPercentaje = (personAmount * 100) / totalAmountExpenses()
                            personRoundedAmountPercentaje = Math.round(personAmountPercentaje)
                        }

                        return (
                            <li key={index} className=' hover:bg-gray-50 rounded-xl p-3 my-2 '>
                                <div className='flex justify-between items-center mb-2'>
                                    {/* <AvatarSVG width={40} height={40} fillColor={`fill-black`} /> */}
                                    {/* <UserSVG fillColor={`fill-primary`} /> */}

                                    <h5 className='m-0'>{person.name}</h5>
                                    <p className=''>{personRoundedAmountPercentaje}%</p>
                                    {/* <ExpenseCost cost={`${roundedPercentaje}%`} /> */}
                                </div>
                                <div className='m-auto flex gap-2 items-center '>
                                    <div className={`bg-gray-200 rounded-lg h-4 w-full`}>
                                        <div
                                            className='bg-primary rounded-lg h-4'
                                            style={{ width: `${personRoundedAmountPercentaje}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <h3 className='m-0'>{currencyFormat(personAmount ?? 0)}</h3>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Personas</h3>
            </div>
            <PersonsMenu menuOptionSelected={menuOptionSelected} handleClick={handleClick} />
            {menuOptionSelected === 'listado' ? <PersonsList /> : <PersonsTotals />}
        </>
    )
}

export default Persons

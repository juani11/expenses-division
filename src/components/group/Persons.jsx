import { useState } from 'react'
import PersonsMenu, { PERSONS_LIST } from './PersonsMenu'
import PersonsTotals from './PersonsTotals'
import PersonsList from './PersonsList'

const Persons = () => {
    const [menuOptionSelected, setMenuOptionSelected] = useState(PERSONS_LIST)
    const handleClick = setMenuOptionSelected

    return (
        <>
            <div className='flex justify-between items-center px-1 py-2'>
                <h3 className='uppercase'>Personas</h3>
            </div>
            <PersonsMenu menuOptionSelected={menuOptionSelected} changeMenuOption={handleClick} />
            {menuOptionSelected === PERSONS_LIST ? <PersonsList /> : <PersonsTotals />}
        </>
    )
}

export default Persons

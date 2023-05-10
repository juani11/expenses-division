import { useState } from 'react'
import PersonsMenu, { PERSONS_LIST, PERSONS_TOTALS } from './PersonsMenu'
import PersonsTotals from './PersonsTotals'
import PersonsList from './PersonsList'
import CardHeader from '../common/CardHeader'

const menuItemsComponents = {
    [PERSONS_LIST]: PersonsList,
    [PERSONS_TOTALS]: PersonsTotals
}

const usePersonsMenu = () => {
    const [menuItemSelected, setMenuItemSelected] = useState(PERSONS_LIST)

    const MenuItemContent = menuItemsComponents[menuItemSelected]

    return {
        menuItemSelected,
        changeMenuOption: setMenuItemSelected,
        MenuItemContent
    }
}
const Persons = () => {
    const { menuItemSelected, changeMenuOption, MenuItemContent } = usePersonsMenu()

    return (
        <>
            <CardHeader title={'personas'} />

            <PersonsMenu menuItemSelected={menuItemSelected} changeMenuOption={changeMenuOption} />
            <MenuItemContent />
        </>
    )
}

export default Persons

import { useState } from 'react'
import PersonsMenu, { PERSONS_LIST, PERSONS_TOTALS } from './PersonsMenu'
import PersonsTotals from './PersonsTotals'
import PersonsList from './PersonsList'
import CardHeader from '../common/CardHeader'
import PersonsLoading from './PersonsLoading'
import { useGroupStore } from '../../store/store'

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
    const loading = useGroupStore(state => state.loading)

    const { menuItemSelected, changeMenuOption, MenuItemContent } = usePersonsMenu()
    return (
        <div>
            <CardHeader title={'personas'} />
            {loading ? (
                <PersonsLoading />
            ) : (
                <>
                    <PersonsMenu menuItemSelected={menuItemSelected} changeMenuOption={changeMenuOption} />
                    <MenuItemContent />
                </>
            )}
        </div>
    )
}

export default Persons

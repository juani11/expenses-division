import useCardMenu from '../../hooks/useCardMenu'
import { useGroupStore } from '../../store/store'
import CardHeader from '../common/CardHeader'
import CardMenu from '../common/CardMenu'
import PersonsList from './PersonsList'
import PersonsLoading from './PersonsLoading'
import PersonsTotals from './PersonsTotals'

const PERSONS_LIST = 'listado'
const PERSONS_TOTALS = 'totales'

const menuItemsComponents = {
    [PERSONS_LIST]: PersonsList,
    [PERSONS_TOTALS]: PersonsTotals
}

const menuItems = [PERSONS_LIST, PERSONS_TOTALS]

const Persons = () => {
    const loading = useGroupStore(state => state.loading)

    const { menuItemSelected, changeMenuOption, MenuItemContent } = useCardMenu(menuItemsComponents)
    return (
        <section id='persons'>
            <CardHeader title={'personas'} />
            {loading ? (
                <PersonsLoading />
            ) : (
                <>
                    <CardMenu
                        menuItems={menuItems}
                        menuItemSelected={menuItemSelected}
                        changeMenuOption={changeMenuOption}
                    />
                    <MenuItemContent />
                </>
            )}
        </section>
    )
}

export default Persons

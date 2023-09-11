import useCardMenu from '../../hooks/useCardMenu'
import CardMenu from './CardMenu'

const CardContentWithMenu = ({ menuItemsComponents }) => {
    const menuItems = Object.keys(menuItemsComponents)

    const { menuItemSelected, changeMenuOption, MenuItemContent } = useCardMenu(menuItemsComponents)

    return (
        <>
            <CardMenu
                menuItems={menuItems}
                menuItemSelected={menuItemSelected}
                changeMenuOption={changeMenuOption}
            />
            <MenuItemContent />
        </>
    )
}
export default CardContentWithMenu

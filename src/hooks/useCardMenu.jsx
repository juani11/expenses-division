import { useState } from 'react'

const initialState = menuItemsComponents => {
    const menuItemsComponentsKeys = Object.keys(menuItemsComponents)
    const [firstKey] = menuItemsComponentsKeys
    return firstKey
}

const useCardMenu = menuItemsComponents => {
    const [menuItemSelected, setMenuItemSelected] = useState(initialState(menuItemsComponents))

    const MenuItemContent = menuItemsComponents[menuItemSelected]

    return {
        menuItemSelected,
        changeMenuOption: setMenuItemSelected,
        MenuItemContent
    }
}

export default useCardMenu

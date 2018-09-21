import { observer } from "mobx-react"
import * as React from "react"
import { IMenuItemStore } from "../../stores/MenuItem/MenuItemStore"
import { MenuItem } from "./MenuItem"

interface IMenuItemsList {
  store: IMenuItemStore
  viewName: string
  itemClickHandler: (link: string) => void
}

export const MenuItemsList: React.SFC<IMenuItemsList> = observer(
  (props): JSX.Element => {
    const { store, viewName, itemClickHandler } = props
    const items = (store && store[viewName]) || []

    const deleteHandler = (type, id) => {
      store.removeItem(type, id)
    }

    return items && items.length ? (
      <ul className="menu-items-list">
        {items.map(item => (
          <MenuItem
            key={item.id}
            data={item}
            onClick={itemClickHandler}
            onDelete={deleteHandler}
          />
        ))}
      </ul>
    ) : null
  }
)

MenuItemsList.displayName = "MenuItemsList"

import { observer } from "mobx-react"
import * as React from "react"
import { Input, Menu } from "semantic-ui-react"
import { CorasIcon } from "../../../components/CorasIcons/CorasIcons"
import { IUsersStore } from "../../../stores/UsersStore"
interface IUserGalleryMenuProps {
  handleNew: () => void
  usersStore: IUsersStore
}

export const UserGalleryMenu: React.SFC<IUserGalleryMenuProps> = observer(
  ({ handleNew, usersStore, ...props }: IUserGalleryMenuProps) => {
    const handleSearch = e => {
      usersStore.setSearchText(e.currentTarget.value)
      e.preventDefault()
    }

    const handleReset = e => {
      usersStore.setSearchText("")
      e.preventDefault()
    }

    return (
      <Menu secondary={true}>
        <Menu.Item>
          <Input
            icon="search"
            placeholder="search by user"
            value={usersStore.searchText}
            onChange={handleSearch}
          />
        </Menu.Item>
        <Menu.Item>
          <button className="coras-btn-style-1" onClick={handleReset}>
            <CorasIcon name="REFRESH" title="clear filter" />
            <span className="content">reset all filters</span>
          </button>
        </Menu.Item>
        <Menu.Item>
          <button className="coras-btn-style-1 right" onClick={handleNew}>
            <CorasIcon name="HOW_TO_REG" title="invite user" />
            <span className="content">invite User</span>
          </button>
        </Menu.Item>
      </Menu>
    )
  }
)

UserGalleryMenu.displayName = "UserGalleryMenu"

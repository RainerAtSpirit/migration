import * as React from "react"
import { Button, Input, Menu } from "semantic-ui-react"
import { IUser } from "../../../stores/UsersStore"

interface IUserGalleryMenuProps {
  handleNew: () => void
}

export const UserGalleryMenu: React.SFC<IUserGalleryMenuProps> = ({
  handleNew,
  ...props
}: IUserGalleryMenuProps) => {
  // tslint:disable-next-line
  function handleClick() {}
  return (
    <Menu secondary={true}>
      <Menu.Item>
        <Input disabled={true} icon="search" placeholder="search by user" />
      </Menu.Item>
      <Menu.Item
        icon={"repeat"}
        name="reset all filters"
        onClick={handleClick}
      />
      <Menu.Menu position="right">
        <Menu.Item>
          <Button primary={true} onClick={handleNew}>
            Invite User
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

UserGalleryMenu.displayName = "UserGalleryMenu"

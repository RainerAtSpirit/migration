import * as React from "react"
import { Button, Input, Menu } from "semantic-ui-react"

// todo: Consider converting views into folders
export const UserGalleryMenu: React.SFC<any> = ({ ...props }) => {
  // tslint:disable-next-line
  function handleClick() {}
  return (
    <Menu secondary={true}>
      <Menu.Item>
        <Input disabled={false} icon="search" placeholder="search by user" />
      </Menu.Item>
      <Menu.Item
        icon={"repeat"}
        name="reset all filters"
        onClick={handleClick}
      />
      <Menu.Menu position="right">
        <Menu.Item>
          <Button primary={true} disabled={true}>
            Invite User
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

UserGalleryMenu.displayName = "UserGalleryMenu"

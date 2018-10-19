import * as React from "react"
import { Button, Icon, Input, Menu } from "semantic-ui-react"
import { CorasIcon } from "../../../components/CorasIcons/CorasIcons"
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
      <Menu.Item>
        <button className="coras-btn-style-1">
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

UserGalleryMenu.displayName = "UserGalleryMenu"

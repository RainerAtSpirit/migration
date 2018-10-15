import * as React from "react"
import { Button, Input, Menu } from "semantic-ui-react"
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
      <div className="coras-btn-style-1">
        <i className="material-icons" title="clear filters">
          refresh
        </i>
        <span className="content">reset all filters</span>
      </div>
      <div className="coras-btn-style-1 right">
        <i className="material-icons" title="clear filters">
          how_to_reg
        </i>
        <span className="content">invite user</span>
      </div>
    </Menu>
  )
}

UserGalleryMenu.displayName = "UserGalleryMenu"

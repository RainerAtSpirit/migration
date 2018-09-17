import { Observer } from "mobx-react"
import * as React from "react"
import { Dropdown, DropdownProps, Icon } from "semantic-ui-react"
import { ICurrentUserStore } from "../../stores/CurrentUserStore"

export interface ICurrentUserMenuProps extends DropdownProps {
  userStore: ICurrentUserStore
}

export const CurrentUserMenu: React.SFC<ICurrentUserMenuProps> = ({
  userStore,
  ...props
}) => {
  function signOut() {
    location.replace("/logout")
  }

  return (
    <Observer>
      {() => {
        const user = userStore.user
        const displayName = user ? user.DisplayName : "..."
        const defaults = {
          trigger: (
            <span>
              <Icon name="user" /> Hello, {displayName}
            </span>
          ),
          options: [{ key: "sign-out", text: "Sign Out", onClick: signOut }]
        }

        return userStore.isPending ? (
          <Dropdown {...defaults} {...props} loading={true} />
        ) : (
          <Dropdown {...defaults} {...props} />
        )
      }}
    </Observer>
  )
}

CurrentUserMenu.displayName = "CurrentUserMenu"

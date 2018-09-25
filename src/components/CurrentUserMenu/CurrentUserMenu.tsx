import { inject, observer } from "mobx-react"
import * as React from "react"
import { Dropdown, DropdownProps, Icon } from "semantic-ui-react"
import { ICurrentUserStore } from "../../stores/CurrentUserStore"
import "./currentUserMenu.less"

export interface ICurrentUserMenuProps extends DropdownProps {
  userStore: ICurrentUserStore
}

export const CurrentUserMenu: React.SFC<ICurrentUserMenuProps> = inject(
  "routerStore"
)(
  observer(({ userStore, routerStore, ...props }: ICurrentUserMenuProps) => {
    function signOut() {
      location.replace("/logout")
    }

    function navigate(name: string, params = {}) {
      routerStore.router.navigate(name, params)
    }

    // tslint:disable-next-line
    function noop() {}

    const user = userStore.user
    const displayName = user ? user.DisplayName : "..."

    const userOptions = [
      { key: "account-settings", text: "Account Settings", onClick: noop },
      { key: "help", text: "Help", onClick: noop },
      { key: "sign-out", text: "Sign Out", onClick: signOut }
    ]
    const adminOptions = [
      { key: "process", text: "Process Home", onClick: noop },
      {
        key: "user",
        text: "Manage User",
        onClick: () => navigate("usergallery", {})
      },
      { key: "billing", text: "Manage Billing", onClick: noop }
    ]

    const defaults = {
      trigger: (
        <span>
          <Icon name="user" />
          {displayName}
        </span>
      ),
      options:
        user && user.isAdmin
          ? [].concat(adminOptions, userOptions)
          : [].concat(userOptions)
    }

    return (
      <div className={"currentUserMenu"}>
        <Dropdown
          {...defaults}
          {...props}
          direction="left"
          loading={userStore.isPending}
        />
      </div>
    )
  })
)

CurrentUserMenu.displayName = "CurrentUserMenu"

import { inject, observer } from "mobx-react"
import { applySnapshot } from "mobx-state-tree"
import * as React from "react"
import { Dropdown, DropdownProps, Icon } from "semantic-ui-react"
import { Routes } from "../../routes"
import { ICurrentUserStore, IPanelStore, IRootStore } from "../../stores"
import "./currentUserMenu.less"

export interface ICurrentUserMenuProps extends DropdownProps {
  currentUserStore: ICurrentUserStore
  store?: IRootStore
}

export const CurrentUserMenu: React.SFC<ICurrentUserMenuProps> = inject(
  "store"
)(
  observer(
    ({
      currentUserStore,
      store,
      store: { routerStore, usersStore },
      ...props
    }: ICurrentUserMenuProps) => {
      const panelStore: IPanelStore = store.panelStore
      const user = currentUserStore.user
      const userProperties =
        currentUserStore.user && currentUserStore.user.properties
      const displayName = userProperties ? userProperties.DisplayName : "..."

      function signOut() {
        location.replace("/logout")
      }

      const createOnSubmitMethod = (model, collection, overlay) => values => {
        if (model === null) {
          return
        }
        applySnapshot(model, { uid: model.uid, properties: { ...values } })
        // changes will be persisted by the usersStore as currentUserStore is read-only
        collection.addOrUpdateItem(model)
        model.asyncPersist()
        overlay.close()
      }
      const handleAccountSettings = () => {
        panelStore.openPanel(
          user,
          "account",
          createOnSubmitMethod(user, usersStore, panelStore)
        )
      }

      function navigate(name: string, params = {}) {
        routerStore.router.navigate(name, params)
      }

      // tslint:disable-next-line
      function noop() {}

      const userOptions = [
        {
          key: "account-settings",
          text: "Account Settings",
          onClick: handleAccountSettings
        },
        { key: "help", text: "Help", onClick: noop },
        { key: "sign-out", text: "Sign Out", onClick: signOut }
      ]
      const adminOptions = [
        { key: "process", text: "Process Home", onClick: noop },
        {
          key: "user",
          text: "Manage User",
          onClick: () => navigate(Routes.USERS_GALLERY, {})
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
            loading={currentUserStore.isPending}
          />
        </div>
      )
    }
  )
)

CurrentUserMenu.displayName = "CurrentUserMenu"

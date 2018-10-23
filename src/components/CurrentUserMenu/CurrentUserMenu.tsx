import { inject, observer } from "mobx-react"
import { applySnapshot } from "mobx-state-tree"
import * as React from "react"
import { Dropdown, DropdownProps, Icon } from "semantic-ui-react"
import { Routes } from "../../routes"
import { IOverlayStore, IRootStore, User } from "../../stores"
import { ICurrentUserStore } from "../../stores/CurrentUserStore"
import { IOverlayProps } from "../Overlay"
import "./currentUserMenu.less"

export interface ICurrentUserMenuProps extends DropdownProps {
  currentUserStore: ICurrentUserStore
  store?: IRootStore
  overlayStore?: IOverlayStore
}

export const CurrentUserMenu: React.SFC<ICurrentUserMenuProps> = inject(
  "store"
)(
  observer(
    ({
      currentUserStore,
      store,
      store: { routerStore, overlayStore, usersStore },
      ...props
    }: ICurrentUserMenuProps) => {
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
        overlayStore.openPanel(
          user,
          "account",
          createOnSubmitMethod(user, usersStore, overlayStore)
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

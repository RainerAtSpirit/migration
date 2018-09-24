import { Instance, types } from "mobx-state-tree"
import { APP_ID } from "../constants"
import { CurrentUserStore } from "./CurrentUserStore"
import { MenuItemStore } from "./MenuItem/MenuItemStore"
import { OverlayStore } from "./OverlayStore/OverlayStore"
import { UsersStore } from "./UsersStore/UsersStore"

export const RootStore = types
  .model("RootStore", {
    appId: types.optional(types.string, APP_ID),
    currentUserStore: types.optional(CurrentUserStore, {}),
    usersStore: types.optional(UsersStore, {}),
    menuItemStore: types.optional(MenuItemStore, {}),
    overlayStore: types.optional(OverlayStore, {})
  })
  .views(self => ({
    get storageId() {
      return self.currentUserStore.isDone
        ? `menu-${self.appId}${self.currentUserStore.user.Id}`
        : ""
    }
  }))
  .actions((self: IRootStore) => ({
    // Todo: Generic dependency strategy
    afterCreate() {
      self.currentUserStore.load().then(() => {
        self.menuItemStore.loadFromLocalStorage()
      })
    }
  }))

export const store = RootStore.create()
export interface IRootStore extends Instance<typeof RootStore> {}

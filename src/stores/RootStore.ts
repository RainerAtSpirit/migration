import { Instance, types } from "mobx-state-tree"
import { CurrentUserStore } from "./CurrentUserStore"
import { routerStore } from "./RouterStore"
import { UsersStore } from "./UsersStore/UsersStore"

const RootStore = types
  .model("RootStore", {
    currentUserStore: types.optional(CurrentUserStore, {}),
    usersStore: types.optional(UsersStore, {})
  })
  .actions(self => ({
    afterCreate() {
      self.currentUserStore.load()
    }
  }))

export const store = RootStore.create()
export interface IRootStore extends Instance<typeof RootStore> {}

import { Instance, types } from "mobx-state-tree"
import { CurrentUserStore } from "./CurrentUserStore"
import { routerStore } from "./RouterStore"

const RootStore = types
  .model("RootStore", {
    dummyProp: types.optional(types.string, ""),
    currentUserStore: types.optional(CurrentUserStore, {})
  })
  .actions(self => ({
    afterCreate() {
      self.currentUserStore.load()
    }
  }))

export const store = RootStore.create()
export interface IRootStore extends Instance<typeof RootStore> {}

import corejs from "@coras/corejs"
import { observable } from "mobx"
import { applySnapshot, flow, Instance, types } from "mobx-state-tree"
import { LoadingState } from "../common"
import { LoadingStates } from "../types"
import { IUser, User } from "./UserModel"

export const UsersStore = types.compose(
  LoadingState,
  types
    .model("UsersStore", {
      items: types.array(User),
      selectedItem: types.maybe(types.late(() => User))
    })
    .actions((self: IUsersStore) => {
      const load = flow(function*() {
        self.setState(LoadingStates.PENDING)
        try {
          self.items = yield corejs.odata.users.orderBy("DisplayName").get()
          self.setState(LoadingStates.DONE)
        } catch (err) {
          self.setState(LoadingStates.ERROR)
        }
      })

      function addOrUpdate(item: IUser) {
        const existingItem = self.items.find(i => i.uid === item.uid)
        if (existingItem) {
          applySnapshot(existingItem, item)
          return existingItem
        } else {
          const newItem = User.create(item)
          self.items.unshift(item)
          return newItem
        }
      }

      function removeAndDeleteItem(item: IUser) {
        self.items.remove(item)
        return item.remove()
      }

      return {
        addOrUpdate,
        load,
        removeAndDeleteItem
      }
    })
)

export interface IUsersStore extends Instance<typeof UsersStore> {}

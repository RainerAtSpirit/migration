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
        self.setState(LoadingStates.pending)
        try {
          self.items = yield corejs.odata.users
            // Todo: Check with Rick: orderBy isn't working as expected
            .orderBy("DisplayName")
            .get()
          self.setState(LoadingStates.done)
        } catch (err) {
          self.setState(LoadingStates.error)
        }
      })

      function addOrUpdate(item: IUser) {
        const existingItem = self.items.find(i => i.uid === item.uid)
        if (existingItem) {
          applySnapshot(existingItem, item)
        } else {
          self.items.unshift(User.create(item))
        }
      }

      return {
        addOrUpdate,
        load
      }
    })
)

export interface IUsersStore extends Instance<typeof UsersStore> {}

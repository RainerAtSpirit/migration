import corejs from "@coras/corejs"
import { observable } from "mobx"
import { flow, Instance, types } from "mobx-state-tree"
import { LoadingState } from "../common/LoadingState"
import { LoadingStates } from "../types"
import { User } from "./UserModel"

export const UsersStore = types.compose(
  LoadingState,
  types
    .model("UsersStore", {
      items: types.array(types.frozen()),
      selectedUser: types.maybe(types.late(() => User))
    })
    .actions((self: IUsersStore) => {
      // const keys = Object.keys(User.create()).map(k => k)
      const load = flow(function*() {
        self.setState(LoadingStates.pending)
        try {
          self.items = []
          self.items = yield corejs.odata.users
            .orderBy("DisplayName")
            // .select(keys.join(", "))
            .get()
          self.setState(LoadingStates.done)
        } catch (err) {
          self.setState(LoadingStates.error)
        }
      })

      function splice(start, count) {
        self.users.splice(start, count)
      }

      return {
        load,
        splice
      }
    })
)

export interface IUsersStore extends Instance<typeof UsersStore> {}

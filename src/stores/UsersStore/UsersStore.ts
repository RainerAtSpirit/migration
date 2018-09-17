import corejs from "@coras/corejs"
import { flow, Instance, types } from "mobx-state-tree"
import { LoadingState } from "../common/LoadingState"
import { User } from "./UserModel"

export const UsersStore = types.compose(
  LoadingState,
  types
    .model("UsersStore", {
      users: types.array(types.frozen()),
      selectedUser: types.maybe(types.late(() => User))
    })
    .actions((self: IUsersStore) => {
      const keys = Object.keys(User.create()).map(k => k)

      const load = flow(function*() {
        self.setState("pending")
        try {
          const json = yield corejs.odata.users
            .orderBy("DisplayName")
            // .select(keys.join(", "))
            .get()
          self.users = json
          self.setState("done")
        } catch (err) {
          self.setState("error")
        }
      })

      return {
        load
      }
    })
)

export interface IUsersStore extends Instance<typeof UsersStore> {}

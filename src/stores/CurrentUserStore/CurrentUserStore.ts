import corejs from "@coras/corejs"
import { flow, getRoot, Instance, types } from "mobx-state-tree"
import { LoadingState } from "../common/LoadingState"
import { IRootStore } from "../RootStore"
import { LoadingStates } from "../types"
import { User } from "../UsersStore"

export const CurrentUserStore = types.compose(
  LoadingState,
  types
    .model("CurrentUserStore", {
      user: types.maybe(types.reference(User))
    })
    .actions((self: ICurrentUserStore) => {
      const load = flow(function*() {
        self.setState(LoadingStates.PENDING)
        try {
          const root: IRootStore = getRoot(self)
          const userStore = root.usersStore
          const json = yield corejs.odata.currentUser.get()
          const user = userStore.addOrUpdateItem(json)
          self.user = user
          self.setState(LoadingStates.DONE)
        } catch (err) {
          self.setState(LoadingStates.ERROR)
        }
      })

      return {
        load
      }
    })
)

export interface ICurrentUserStore extends Instance<typeof CurrentUserStore> {}

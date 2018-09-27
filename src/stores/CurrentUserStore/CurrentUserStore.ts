import corejs from "@coras/corejs"
import { flow, Instance, types } from "mobx-state-tree"
import { LoadingState } from "../common/LoadingState"
import { LoadingStates } from "../types"
import { CurrentUser } from "./CurrentUserModel"

export const CurrentUserStore = types.compose(
  LoadingState,
  types
    .model("CurrentUserStore", {
      user: types.maybe(types.late(() => CurrentUser))
    })
    .actions((self: ICurrentUserStore) => {
      const keys = Object.keys(CurrentUser.create()).map(k => k)

      const load = flow(function*() {
        self.setState(LoadingStates.PENDING)
        try {
          const json = yield corejs.odata.currentUser
            .select(keys.join(", "))
            .get()
          self.user = CurrentUser.create(json)
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

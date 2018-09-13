import corejs from "@coras/corejs"
import { flow, Instance, types } from "mobx-state-tree"
import { LoadingState } from "../common/LoadingState"
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
        self.setState("pending")
        try {
          const json = yield corejs.odata.currentUser
            .select(keys.join(", "))
            .get()
          self.user = CurrentUser.create(json)
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

export interface ICurrentUserStore extends Instance<typeof CurrentUserStore> {}

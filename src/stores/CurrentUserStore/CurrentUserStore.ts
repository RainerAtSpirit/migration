import corejs from "@coras/corejs"
import { flow, Instance, types } from "mobx-state-tree"
import { CurrentUser, ICurrentUser } from "./CurrentUserModel"

export const LoadingState = types.enumeration("State", [
  "idle",
  "pending",
  "done",
  "error"
])

export const CurrentUserStore = types
  .model("CurrentUserStore", {
    user: types.maybe(types.late(() => CurrentUser)),
    state: types.optional(LoadingState, "idle")
  })
  .views(self => {
    return {
      get isDisabled() {
        return self.state !== "done"
      },
      get isLoading() {
        return self.state === "pending"
      }
    }
  })
  .actions(self => {
    const keys = Object.keys(CurrentUser.create()).map(k => k)

    const load = flow(function*() {
      self.state = "pending"
      try {
        const json = yield corejs.odata.currentUser
          .select(keys.join(", "))
          .get()
        self.user = CurrentUser.create(json)
        self.state = "done"
      } catch (err) {
        // console.error("Failed to load apps ", err)
        self.state = "error"
      }
    })

    return {
      load
    }
  })

// tslint:disable-next-line:no-empty-interface
export interface ICurrentUserStore extends Instance<typeof CurrentUserStore> {}

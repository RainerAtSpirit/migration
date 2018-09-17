import { Instance, types } from "mobx-state-tree"
import { TLoadingStates } from "../types"

export const LoadingState = types
  .model("LoadingState", {
    state: types.optional(TLoadingStates, "idle")
  })
  .views(self => {
    return {
      get isDone() {
        return self.state !== "done"
      },
      get isPending() {
        return self.state === "pending"
      },
      get isErrror() {
        return self.state === "error"
      },
      get isIdle() {
        return self.state === "idle"
      }
    }
  })
  .actions(self => ({
    setState(state: Instance<typeof TLoadingStates>) {
      self.state = state
    }
  }))

export interface ILoadingState extends Instance<typeof LoadingState> {}

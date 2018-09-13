import { Instance, types } from "mobx-state-tree"
import { TLoadingStates } from "../types"

export const LoadingState = types
  .model("LoadingState", {
    state: types.optional(TLoadingStates, "idle")
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
    function setState(state: Instance<typeof TLoadingStates>) {
      self.state = state
    }

    return {
      setState
    }
  })

export interface ILoadingState extends Instance<typeof LoadingState> {}

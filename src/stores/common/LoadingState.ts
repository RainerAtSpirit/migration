import { Instance, types } from "mobx-state-tree"
import { LoadingStates, TLoadingStates } from "../types"

export const LoadingState = types
  .model("LoadingState", {
    state: types.optional(TLoadingStates, LoadingStates.idle)
  })
  .views(self => {
    return {
      get isDone() {
        return self.state !== LoadingStates.done
      },
      get isPending() {
        return self.state === LoadingStates.pending
      },
      get isErrror() {
        return self.state === LoadingStates.error
      },
      get isIdle() {
        return self.state === LoadingStates.idle
      }
    }
  })
  .actions(self => ({
    setState(state: Instance<typeof TLoadingStates>) {
      self.state = state
    }
  }))

export interface ILoadingState extends Instance<typeof LoadingState> {}

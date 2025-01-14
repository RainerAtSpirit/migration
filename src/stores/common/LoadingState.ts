import { Instance, types } from "mobx-state-tree"
import { LoadingStates, TLoadingStates } from "../types"

export const LoadingState = types
  .model("LoadingState", {})
  .volatile(self => ({
    state: LoadingStates.IDLE
  }))
  .views(self => {
    return {
      get isDone() {
        return self.state === LoadingStates.DONE
      },
      get isPending() {
        return self.state === LoadingStates.PENDING
      },
      get isError() {
        return self.state === LoadingStates.ERROR
      },
      get isIdle() {
        return self.state === LoadingStates.IDLE
      }
    }
  })
  .actions(self => ({
    setState(state: Instance<typeof TLoadingStates>) {
      self.state = state
    }
  }))

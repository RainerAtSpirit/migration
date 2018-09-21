import { types } from "mobx-state-tree"
import { randomUuid } from "../common"

export const TOptionalId = types.optional(
  types.refinement(types.identifier, identifier =>
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(
      identifier
    )
  ),
  randomUuid
)

export enum LoadingStates {
  idle = "idle",
  pending = "pending",
  done = "done",
  error = "error"
}
export const TLoadingStates = types.enumeration<LoadingStates>(
  "LoadingStates",
  Object.values(LoadingStates)
)

export const OptionalString = types.optional(types.string, "")

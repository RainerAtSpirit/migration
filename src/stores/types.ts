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
  IDLE = "idle",
  PENDING = "pending",
  DONE = "done",
  ERROR = "error"
}

export enum PanelTypes {
  TASK = "task",
  USER = "user"
}

export const TPanelTypes = types.enumeration<PanelTypes>(
  "PanelTypes",
  Object.values(PanelTypes)
)

export const TLoadingStates = types.enumeration<LoadingStates>(
  "LoadingStates",
  Object.values(LoadingStates)
)

export const OptionalString = types.optional(types.string, "")

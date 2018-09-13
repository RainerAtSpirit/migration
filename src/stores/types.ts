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

export const TLoadingStates = types.enumeration([
  "idle",
  "pending",
  "done",
  "error"
])

import { types } from "mobx-state-tree"
import { randomUuid } from "../common"

export enum LoadingStates {
  IDLE = "idle",
  PENDING = "pending",
  DONE = "done",
  ERROR = "error"
}

export enum PanelTypes {
  ACCOUNT = "account",
  TASK = "task",
  USER = "user"
}

export enum ModalTypes {
  MODAL1 = "modal1",
  ALERT = "alert",
  CONFIRM_REMOVE = "confirmRemove"
}

export enum ModelNames {
  PROJECT_MODEL = "ProjectModel",
  PROJECT_TASK_MODEL = "ProjectTaskModel"
}

export type TModelNamesMap = { [key in ModelNames]?: any }

// export const TUnionProjectOrTask = types.maybe(types.union(types.late(() => ProjectModel), types.late(() => ProjectTaskModel)))

export const TOptionalId = types.optional(
  types.refinement(types.identifier, identifier =>
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(
      identifier
    )
  ),
  randomUuid
)

export const TNullOrOptionalString = types.maybeNull(
  types.optional(types.string, "")
)

export const TPanelTypes = types.enumeration<PanelTypes>(
  "PanelTypes",
  Object.values(PanelTypes)
)

export const TModalTypes = types.enumeration<ModalTypes>(
  "ModalTypes",
  Object.values(ModalTypes)
)

export const TLoadingStates = types.enumeration<LoadingStates>(
  "LoadingStates",
  Object.values(LoadingStates)
)

export const OptionalString = types.optional(types.string, "")

import { Instance, types } from "mobx-state-tree"
import { TNullOrOptionalString } from "../types"

export const TaskProps = types.model("TaskProps", {
  Id: TNullOrOptionalString,
  Title: TNullOrOptionalString,
  Cn_ParentId: TNullOrOptionalString,
  ParentProjectId: TNullOrOptionalString,
  AssignedTo: types.optional(types.frozen(), []),
  TaskStatusR_1508195821838: TNullOrOptionalString
})

export interface ITaskProps extends Instance<typeof TaskProps> {}

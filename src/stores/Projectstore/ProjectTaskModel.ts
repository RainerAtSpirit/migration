import { Instance, types } from "mobx-state-tree"
import { composeValidators, Validators } from "../../validations"
import { createModel, createProjectStores } from "../common"
import { TaskProps } from "./TaskProps"

import { COREJS_APP } from "../../constants"
import { ModelNames } from "../types"

const { email, min2Chars, required, max254Chars } = Validators

const validator = {
  Title: composeValidators(required, min2Chars, max254Chars)
}

const childrenStore = createProjectStores({
  storeName: "ChildrenStore",
  Model: types.late(() => ProjectTaskModel),
  ParentModel: types.late(() => ProjectTaskModel),
  isRootStore: false
})

export const ProjectTaskModel = createModel({
  modelName: ModelNames.PROJECT_TASK_MODEL,
  PropertyModel: TaskProps,
  childrenStore,
  collection: COREJS_APP.projects,
  validator
})

// Check Typescript support
// https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const x = Project.create({properties: {}})

export interface IProjectTaskModel extends Instance<typeof ProjectTaskModel> {}

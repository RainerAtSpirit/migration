import { Instance, types } from "mobx-state-tree"
import { COREJS_APP } from "../../constants"
import { composeValidators, Validators } from "../../validations/index"
import { createChildStore, createModel } from "../common/index"
import { ModelNames } from "../types"
import { ProjectProps } from "./ProjectProps"
import { ProjectTaskModel } from "./ProjectTaskModel"

const { email, min2Chars, required, max254Chars } = Validators

const validator = {
  Title: composeValidators(required, min2Chars, max254Chars)
}

const childrenStore = createChildStore({
  storeName: "ChildrenStore",
  ParentModel: types.late(() => ProjectModel),
  Model: ProjectTaskModel,
  collection: COREJS_APP.projects,
  isRootStore: false
})

export const ProjectModel = createModel({
  modelName: ModelNames.PROJECT_MODEL,
  PropertyModel: ProjectProps,
  childrenStore,
  collection: COREJS_APP.projects,
  validator
})

// Check Typescript support
// https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const x = ProjectModel.create({properties: {}})
// x

export interface IProjectModel extends Instance<typeof ProjectModel> {}

import { Instance, types, IAnyModelType } from "mobx-state-tree"
import { COREJS_APP } from "../../constants"
import { composeValidators, Validators } from "../../validations"
import { createModel, createProjectStores } from "../common"
import { ModelNames } from "../types"
import { ProjectProps } from "./ProjectProps"
import { ProjectTaskModel } from "./ProjectTaskModel"

const { email, min2Chars, required, max254Chars } = Validators

const validator = {
  Title: composeValidators(required, min2Chars, max254Chars)
}

const childrenStore = createProjectStores({
  storeName: "ChildrenStore",
  ParentModel: types.late((): IAnyModelType => ProjectModel),
  Model: ProjectTaskModel,
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
// x.properties.

export interface IProjectModel extends Instance<typeof ProjectModel> {}

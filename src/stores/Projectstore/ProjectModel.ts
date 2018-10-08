import * as corejs from "@coras/corejs"
import { cast, Instance } from "mobx-state-tree"
import { COREJS_APP } from "../../constants"
import { composeValidators, Validators } from "../../validations/index"
import { createModel, createModelWithChildren } from "../common/index"
import { ProjectProps } from "./ProjectProps"
import { Task } from "./TaskModel"
import { ModelNames } from "../types"

const { email, min2Chars, required, max254Chars } = Validators

const validator = {
  Title: composeValidators(required, min2Chars, max254Chars)
}

export const ProjectModel = ((window as any).ProjectView = createModelWithChildren(
  ModelNames.PROJECT_MODEL,
  ProjectProps,
  Task,
  COREJS_APP.projects,
  validator
))

// Check Typescript support
// https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const x = Project.create({properties: {}})

export interface IProjectModel extends Instance<typeof ProjectModel> {}

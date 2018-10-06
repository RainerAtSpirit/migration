import * as corejs from "@coras/corejs"
import { cast, Instance } from "mobx-state-tree"
import { composeValidators, Validators } from "../../validations/index"
import { createModel, createModelWithChildren } from "../common/index"
import { TaskProps } from "./TaskProps"

import { COREJS_APP } from "../../constants"

const { email, min2Chars, required, max254Chars } = Validators

const validator = {
  Title: composeValidators(required, min2Chars, max254Chars)
}

export const BaseTask = createModel(
  "BaseTask",
  TaskProps,
  COREJS_APP.projects,
  validator
)

export const Task = createModelWithChildren(
  "ProjectTask",
  TaskProps,
  BaseTask,
  COREJS_APP.projects,
  validator
)

// Check Typescript support
// https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const x = Project.create({properties: {}})

export interface ITask extends Instance<typeof Task> {}

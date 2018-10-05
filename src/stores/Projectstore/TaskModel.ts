import * as corejs from "@coras/corejs"
import { cast, Instance } from "mobx-state-tree"
import { composeValidators, Validators } from "../../validations/index"
import { createModel } from "../common/index"
import { TaskProps } from "./TaskProps"

const { email, min2Chars, required, max254Chars } = Validators

const validator = {
  Title: composeValidators(required, min2Chars, max254Chars)
}

export const Task = createModel(
  "Task",
  TaskProps,
  corejs.odata.users,
  validator
)

// Check Typescript support
// https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const x = Project.create({properties: {}})

export interface I extends Instance<typeof TaskProps> {}

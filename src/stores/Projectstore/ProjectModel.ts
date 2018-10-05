import * as corejs from "@coras/corejs"
import { cast, Instance } from "mobx-state-tree"
import { composeValidators, Validators } from "../../validations/index"
import { createModel } from "../common/index"
import { ProjectProps } from "./ProjectProps"

const { email, min2Chars, required, max254Chars } = Validators

const validator = {
  Title: composeValidators(required, min2Chars, max254Chars)
}

export const Project = createModel(
  "Project",
  ProjectProps,
  corejs.odata.users,
  validator
)

// Check Typescript support
// https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const x = Project.create({properties: {}})

export interface IProject extends Instance<typeof Project> {}

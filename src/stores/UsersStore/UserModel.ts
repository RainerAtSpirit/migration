import * as corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import { composeValidators, Validators } from "../../validations"
import { createModel } from "../common"
import { UserProps } from "./UserProps"

const { email, min2Chars, required, max254Chars } = Validators

// Todo: Wild idea Create a TValidator Type to ensure valid object keys

const validator = {
  DisplayName: composeValidators(required, min2Chars, max254Chars),
  Email: composeValidators(email),
  UserName: composeValidators(required, min2Chars, max254Chars)
}

export const User = createModel(
  "User",
  UserProps,
  corejs.odata.users,
  validator
)

// Check Typescript support
// https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const x = User.create({properties: {}})
// x.properties.

export interface IUser extends Instance<typeof User> {}

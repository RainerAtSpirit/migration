import * as corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import {
  composeValidators,
  ValidatorNames,
  Validators
} from "../../validations"
import { createModel } from "../common"
import { UserProps } from "./UserProps"
const { email, min2Chars, required, max254Chars } = Validators

// Todo: How to create an TValidator Type to ensure valid object key
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

export interface IUser extends Instance<typeof User> {}

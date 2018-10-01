import * as corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import { composeValidators, Validators } from "../../validations"
import { createModel } from "../common"
import { IUserProps, UserProps } from "./UserProps"

const { email, min2Chars, required, max254Chars } = Validators

// Todo: How to create an TValidator Type to ensure valid object keys

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
// const x : IUser = User.create()
// const y : IUserProps = cast(x.properties)

export interface IUser extends Instance<typeof User> {}

import * as corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import { composeValidators, Validators } from "../../validations"
import { createModel } from "../common"
import { UserProps } from "./UserProps"

const { email, min2Chars, required, max254Chars } = Validators

const validator = {
  DisplayName: composeValidators(required, min2Chars, max254Chars),
  Email: composeValidators(email),
  UserName: composeValidators(required, min2Chars, max254Chars)
}

export const User = createModel({
  modelName: "User",
  PropertyModel: UserProps,
  collection: corejs.odata.users,
  validator
})

// Check Typescript support
// https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const x = User.create()
// x.properties.

export interface IUser extends Instance<typeof User> {}

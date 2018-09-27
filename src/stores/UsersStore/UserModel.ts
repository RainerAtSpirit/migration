import * as corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import { UserProps } from "./UserProps"
import { createModel } from "../common/createModel"

export const User = createModel("User", UserProps, corejs.odata.users)

export interface IUser extends Instance<typeof User> {}

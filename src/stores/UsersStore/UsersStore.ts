import corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import { createStore } from "../common"
import { User } from "./UserModel"

export const UsersStore = createStore(
  "UsersStore",
  User,
  corejs.odata.users.orderBy("DisplayName")
)

export interface IUsersStore extends Instance<typeof UsersStore> {}

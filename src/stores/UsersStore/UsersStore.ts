import corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import { User } from "./UserModel"
import { createStore } from "../common/createStore"

export const UsersStore = createStore(
  "UsersStore",
  User,
  corejs.odata.users.orderBy("DisplayName")
)

export interface IUsersStore extends Instance<typeof UsersStore> {}

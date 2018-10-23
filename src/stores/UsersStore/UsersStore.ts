import corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import { createStore } from "../common"
import { User } from "./UserModel"

export const UsersStore = createStore({
  storeName: "UsersStore",
  Model: User,
  collection: corejs.odata.users
})

// Checking typescript support
// ts magic see https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const store = UsersStore.create()
// store.items[0]!.properties.

export interface IUsersStore extends Instance<typeof UsersStore> {}

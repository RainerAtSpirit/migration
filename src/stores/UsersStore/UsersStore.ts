import corejs from "@coras/corejs"
import { Instance, types } from "mobx-state-tree"
import { createStore } from "../common"
import { User } from "./UserModel"

const additional = types.model({}).volatile((self: any) => ({
  profileImageChanged(e, onChange) {
    const files = e.target.files
    const file = files[0]
    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = (ev: any) => {
      const result = ev.target.result

      // todo: convert into store method
      fetch("/api/UsersProfileImage", {
        method: "POST",
        body: JSON.stringify({
          base64String: result.split("base64,")[1],
          extention: "png"
        })
      })
        .then(res => res.json())
        .then(response => {
          onChange(response)
        })
        .catch(error => {
          // console.error("Error:", error)
        })
    }

    reader.readAsDataURL(file)
  }
}))

export const UsersStore = createStore({
  storeName: "UsersStore",
  Model: User,
  collection: corejs.odata.users,
  additional
})

// Checking typescript support
// ts magic see https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const store = UsersStore.create()
// store.items[0]!.properties.

export interface IUsersStore extends Instance<typeof UsersStore> {}

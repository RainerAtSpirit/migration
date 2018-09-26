import * as corejs from "@coras/corejs"
import { flow, Instance, types } from "mobx-state-tree"
import { LoadingState, Persistable } from "../common"
import { LoadingStates } from "../types"
import { UserProps } from "./UserProps"

export const User = types
  .compose(
    "User",
    Persistable,
    LoadingState,
    UserProps
  )
  .actions((self: IUser) => {
    const collection = corejs.odata.users

    const patch = flow(function* patchUser() {
      if (self.isNew || self.state === LoadingStates.done) {
        return
      }
      const user = collection.getById(self.Id)
      self.state = LoadingStates.pending

      try {
        yield user.update(self.payload)
        self.state = LoadingStates.done
      } catch (err) {
        self.state = LoadingStates.error
      }
    })

    return {
      patch
    }
  })

export interface IUser extends Instance<typeof User> {}

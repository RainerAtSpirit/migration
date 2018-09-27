import * as corejs from "@coras/corejs"
import { flow, Instance, types } from "mobx-state-tree"
import { LoadingState, Persistable } from "../common"
import { LoadingStates } from "../types"
import { UserProps } from "./UserProps"

//Todo: abstract into a Saveable factory. Pass in PropModel, corejs collection and name return Model and Interface
export const User = types
  .compose(
    "User",
    Persistable,
    LoadingState,
    UserProps
  )
  .actions((self: IUser) => {
    const collection = corejs.odata.users

    const patch = flow(function* patch() {
      if (!self.isValid || self.isNew || self.state === LoadingStates.PENDING) {
        return Promise.reject("Precondition failed: Can't PATCH")
      }
      const user = collection.getById(self.Id)
      self.state = LoadingStates.PENDING

      try {
        yield user.patch(self.payload)
        self.state = LoadingStates.DONE
      } catch (err) {
        self.state = LoadingStates.ERROR
      }
    })

    const remove = flow(function* remove() {
      if (self.isNew || self.state === LoadingStates.PENDING) {
        return Promise.reject("Precondition failed: Can't DELETE")
      }
      const user = collection.getById(self.Id)
      self.state = LoadingStates.PENDING

      try {
        yield user.delete(self.payload)
        self.state = LoadingStates.DONE
      } catch (err) {
        self.state = LoadingStates.ERROR
      }
    })

    const create = flow(function* create() {
      if (
        !self.isValid ||
        !self.isNew ||
        self.state === LoadingStates.PENDING
      ) {
        return Promise.reject("Precondition failed: Can't POST")
      }
      self.state = LoadingStates.PENDING

      try {
        const addResponse = yield collection.add(self.payload)
        self.Id = addResponse.data.Id
        self.state = LoadingStates.DONE
      } catch (err) {
        self.state = LoadingStates.ERROR
      }
    })

    function createOrPatch() {
      if (self.isNew) {
        return self.create()
      } else {
        return self.patch()
      }
    }

    return {
      create,
      createOrPatch,
      patch,
      remove
    }
  })

export interface IUser extends Instance<typeof User> {}

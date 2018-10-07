import { destroy, flow, getSnapshot, types } from "mobx-state-tree"
import { LoadingStates, TOptionalId } from "../types"

export function createPersistable(collection) {
  const Persistable = types
    .model("Persistable", {
      uid: TOptionalId
    })
    .volatile(self => ({
      errors: null
    }))
    .actions((self: any) => {
      const asyncPatch = flow(function*() {
        if (!self.isValid && !self.isNew) {
          yield Promise.reject("Precondition failed")
        }

        const { Id, ...payload } = self.payload

        const user = collection.getById(Id)
        self.state = LoadingStates.PENDING

        try {
          yield user.patch(payload)
          self.state = LoadingStates.DONE
        } catch (err) {
          self.errors = err
          self.state = LoadingStates.ERROR
        }
      })

      const asyncRemove = flow(function*() {
        if (self.isNew) {
          yield Promise.reject("Precondition failed")
        }
        const {
          properties: { Id }
        } = getSnapshot(self)
        const user = collection.getById(Id)

        self.state = LoadingStates.PENDING

        try {
          yield user.delete()
          destroy(self)
          self.state = LoadingStates.DONE
        } catch (err) {
          self.errors = err
          self.state = LoadingStates.ERROR
        }
      })

      const asyncCreate = flow(function*() {
        if (!self.isValid || !self.isNew) {
          yield Promise.reject("Precondition failed")
        }
        self.state = LoadingStates.PENDING
        const payload = { ...self.payload }
        delete payload.Id

        try {
          const addResponse = yield collection.add(payload)
          self.properties.Id = addResponse.data.Id
          self.state = LoadingStates.DONE
        } catch (err) {
          self.errors = err
          self.state = LoadingStates.ERROR
        }
      })

      function asyncPersist() {
        if (self.isNew) {
          return asyncCreate()
        } else {
          return asyncPatch()
        }
      }

      const api: any = {
        asyncPersist,
        asyncRemove
      }

      if (self.childrenStore && self.childrenStore.load) {
        api.asyncLoad = self.childrenStore.load
      }
      return api
    })

  return Persistable
}

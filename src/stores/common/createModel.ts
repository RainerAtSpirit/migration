import * as corejs from "@coras/corejs"
import { flow, Instance, types } from "mobx-state-tree"
import { createValidatable, LoadingState, Persistable } from "../common"
import { LoadingStates } from "../types"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export function createModel(
  modelName: string,
  Props: any,
  collection: TStrawmanCollection,
  validator?: any
) {
  const Model = types.compose(
    modelName,
    Persistable,
    LoadingState,
    Props,
    validator ? createValidatable(validator) : null,
    types.model({}).actions((self: IModel) => {
      const asyncPatch = () => {
        if (
          !self.isValid ||
          self.isNew ||
          self.state === LoadingStates.PENDING
        ) {
          return Promise.reject("Precondition failed")
        }
        return flow(function*() {
          const user = collection.getById(self.Id)
          self.state = LoadingStates.PENDING

          try {
            yield user.patch(self.payload)
            self.state = LoadingStates.DONE
          } catch (err) {
            self.state = LoadingStates.ERROR
          }
        })
      }

      const asyncRemove = () => {
        if (self.isNew || self.state === LoadingStates.PENDING) {
          return Promise.reject("Precondition failed")
        }

        return flow(function*() {
          const user = collection.getById(self.Id)
          self.state = LoadingStates.PENDING

          try {
            yield user.delete(self.payload)
            self.state = LoadingStates.DONE
          } catch (err) {
            self.state = LoadingStates.ERROR
          }
        })
      }

      const asyncCreate = () => {
        if (
          !self.isValid ||
          !self.isNew ||
          self.state === LoadingStates.PENDING
        ) {
          return Promise.reject("Precondition failed")
        }

        return flow(function*() {
          self.state = LoadingStates.PENDING

          try {
            const addResponse = yield collection.add(self.payload)
            self.Id = addResponse.data.Id
            self.state = LoadingStates.DONE
          } catch (err) {
            self.state = LoadingStates.ERROR
          }
        })
      }

      function asyncPersist() {
        if (self.isNew) {
          return asyncCreate()
        } else {
          return asyncPatch()
        }
      }

      return {
        asyncPersist,
        asyncRemove
      }
    })
  )

  interface IModel extends Instance<typeof Model> {}

  const x: IModel = Model.create()

  return Model
}

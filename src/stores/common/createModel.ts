import * as corejs from "@coras/corejs"
import { flow, Instance, types } from "mobx-state-tree"
import { LoadingState, Persistable } from "../common"
import { LoadingStates } from "../types"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export function createModel(
  modelName: string,
  Props: any,
  collection: TStrawmanCollection
) {
  //Todo: abstract into a Saveable factory. Pass in PropModel, corejs collection and name return Model and Interface
  const Model = types
    .compose(
      modelName,
      Persistable,
      LoadingState,
      Props
    )
    .actions((self: IModel) => {
      const patch = () => {
        if (
          !self.isValid ||
          self.isNew ||
          self.state === LoadingStates.PENDING
        ) {
          return Promise.reject("Precondition failed: Can't PATCH")
        }
        return flow(function* patch() {
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

      const remove = () => {
        if (self.isNew || self.state === LoadingStates.PENDING) {
          return Promise.reject("Precondition failed: Can't DELETE")
        }

        return flow(function* remove() {
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
      const create = () => {
        if (
          !self.isValid ||
          !self.isNew ||
          self.state === LoadingStates.PENDING
        ) {
          return Promise.reject("Precondition failed: Can't POST")
        }

        return flow(function* create() {
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

  interface IModel extends Instance<typeof Model> {}

  return Model
}

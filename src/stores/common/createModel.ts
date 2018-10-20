import * as corejs from "@coras/corejs"
import {
  getSnapshot,
  getType,
  IModelType,
  isStateTreeNode,
  ModelProperties,
  types,
  IAnyModelType
} from "mobx-state-tree"
import { createPersistable, createValidatable, LoadingState } from "../common"
import { randomUuid } from "../../common"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export const createModel = <IT extends IAnyModelType>(
  modelName: string,
  PropsModel: IT,
  collection: TStrawmanCollection,
  validator?: any
) => {
  const Model = types.compose(
    modelName,
    types
      .model({
        properties: PropsModel
      })
      .views((self: any) => ({
        // isValid true can be overwritten by Validatable
        get isValid() {
          return true
        },
        get isNew() {
          return self.properties.Id === ""
        },
        get typeName() {
          return getType(self).name
        },
        get _payload() {
          return getSnapshot(self.properties)
        },
        // todo: Generic payload overwrite
        get payload() {
          if ("payload" in self.properties) {
            return self.properties.payload
          }
          return this._payload
        }
      }))
      .preProcessSnapshot((snapshot: any) => {
        if (typeof snapshot === "undefined") {
          return
        }

        if ("uid" in snapshot) {
          return snapshot
        }

        if (!("properties" in snapshot)) {
          snapshot = {
            uid: snapshot.Id || randomUuid(),
            properties: { ...snapshot }
          }
        } else if (!("uid" in snapshot)) {
          snapshot.uid = snapshot.properties.Id || randomUuid()
        }

        // https://github.com/mobxjs/mobx-state-tree/issues/616
        return {
          ...(isStateTreeNode(snapshot) ? getSnapshot(snapshot) : snapshot)
        }
      }),
    createPersistable(collection),
    validator ? createValidatable(validator) : null,
    LoadingState
  )

  return Model
}

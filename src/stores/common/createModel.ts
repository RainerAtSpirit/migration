import * as corejs from "@coras/corejs"
import {
  getSnapshot,
  isStateTreeNode,
  ModelProperties,
  IModelType,
  types
} from "mobx-state-tree"
import { createPersistable, createValidatable, LoadingState } from "../common"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export const createModel = <P extends ModelProperties, O, C, S, T>(
  modelName: string,
  PropsModel: IModelType<P, O, C, S, T>,
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
        get _payload() {
          const payload: any = {}
          const props = self.properties
          props.$treenode.type.propertyNames.forEach(
            k => (payload[k] = props[k])
          )

          return payload
        },
        get payload() {
          if ("payload" in self.properties) {
            return self.properties.payload
          }
          return this.payload
        }
      }))
      .preProcessSnapshot((snapshot: any) => {
        if (typeof snapshot === "undefined") {
          return
        }

        if (
          "properties" in snapshot &&
          "Id" in snapshot.properties &&
          snapshot.properties.Id !== ""
        ) {
          snapshot.uid = snapshot.properties.Id
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

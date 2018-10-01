import * as corejs from "@coras/corejs"
import { getSnapshot, isStateTreeNode, types } from "mobx-state-tree"
import { createPersistable, createValidatable, LoadingState } from "../common"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export function createModel(
  modelName: string,
  PropsModel: any,
  collection: TStrawmanCollection,
  validator?: any
) {
  const EnhancedPropsModel = types.compose(
    types
      .model({
        properties: types.optional(PropsModel, {})
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
      // Set existing Id to uid
      .preProcessSnapshot(snapshot => {
        if (typeof snapshot === "undefined") {
          return
        }
        // https://github.com/mobxjs/mobx-state-tree/issues/616
        const enhancedSnapshot = {
          ...(isStateTreeNode(snapshot) ? getSnapshot(snapshot) : snapshot)
        }

        if (
          "properties" in enhancedSnapshot &&
          "Id" in enhancedSnapshot.properties
        ) {
          enhancedSnapshot.uid = enhancedSnapshot.properties.Id
        }

        // Move to model.properties
        return enhancedSnapshot
      }),
    createPersistable(collection),
    validator ? createValidatable(validator) : null
  )

  const Model = types.compose(
    modelName,
    EnhancedPropsModel,
    LoadingState
  )

  return Model
}

import * as corejs from "@coras/corejs"
import {
  getSnapshot,
  getType,
  IModelType,
  isStateTreeNode,
  ModelProperties,
  types
} from "mobx-state-tree"
import {
  createPersistable,
  createStore,
  createValidatable,
  LoadingState
} from "../common"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export const createModelWithChildren = <P extends ModelProperties, O, C, S, T>(
  modelName: string,
  PropsModel: IModelType<P, O, C, S, T>,
  ChildModel: any,
  collection: TStrawmanCollection,
  validator?: any
) => {
  const childrenStore = createStore("ChildrenStore", ChildModel, collection)

  const Model = types.compose(
    modelName,
    types
      .model({
        childrenStore,
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
        let modifiedSnapshot = snapshot
        // tslint:disable-next-line
        let { Children, ...rest } = snapshot

        // omit old phantom root task
        if (
          Array.isArray(Children) &&
          Children.length === 1 &&
          Children[0].Cn_ParentId === null
        ) {
          Children = Children[0].Children
        }

        if (!("properties" in snapshot)) {
          modifiedSnapshot = {
            properties: { ...rest },
            childrenStore: {
              parentProjectId: rest.ParentProjectId || rest.Id,
              items: Children
            }
          }
        }

        // https://github.com/mobxjs/mobx-state-tree/issues/616
        return modifiedSnapshot
      }),
    createPersistable(collection),
    validator ? createValidatable(validator) : null,
    LoadingState
  )

  return Model
}

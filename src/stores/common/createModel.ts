import * as corejs from "@coras/corejs"
import {
  getSnapshot,
  getType,
  IAnyModelType,
  isStateTreeNode,
  types
} from "mobx-state-tree"
import { randomUuid } from "../../common"
import { createPersistable, createValidatable, LoadingState } from "../common"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export const createModel = <IT extends IAnyModelType>({
  modelName,
  PropertyModel,
  childrenStore,
  collection,
  validator,
  additional
}: {
  modelName: string
  PropertyModel: IT
  childrenStore?: any
  collection: TStrawmanCollection
  validator?: any
  additional?: any
}) => {
  const childrenOrFlat = getModel(childrenStore)

  const Model = types.compose(
    modelName,
    types
      .model({
        properties: PropertyModel
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
        get payload() {
          return getSnapshot(self.properties)
        }
      })),
    childrenOrFlat,
    LoadingState,
    createPersistable(collection),
    validator ? createValidatable(validator) : types.model({}),
    additional ? additional : types.model({})
  )

  return Model

  function getModel(children) {
    let model
    if (typeof children !== "undefined") {
      model = types
        .model("Children", {
          childrenStore: types.optional(children, {})
        })
        .preProcessSnapshot((snapshot: any) => {
          if (typeof snapshot === "undefined") {
            return
          }
          if ("uid" in snapshot) {
            return snapshot
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
              uid: rest.Id || randomUuid(),
              properties: { ...rest },
              childrenStore: {
                parentProjectId: rest.ParentProjectId || rest.Id,
                items: Children,
                isParent: rest.Cn_ParentId === null,
                Cn_ParentId: rest.Cn_ParentId,
                Id: rest.Id
              }
            }
          }

          return modifiedSnapshot
        })
    } else {
      model = types.model("Flat", {}).preProcessSnapshot((snapshot: any) => {
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
      })
    }

    return model
  }
}

import * as corejs from "@coras/corejs"
import {
  applySnapshot,
  destroy,
  detach,
  flow,
  IModelType,
  Instance,
  ModelProperties,
  resolveIdentifier,
  types,
  getType
} from "mobx-state-tree"
import { COREJS_APP } from "./../../constants"
import { LoadingState } from "../common"
import { LoadingStates, TNullOrOptionalString } from "../types"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = any

export const createStore = <P extends ModelProperties, O, C, S, T>(
  storeName: string,
  Model: IModelType<P, O, C, S, T>,
  collection: TStrawmanCollection
) => {
  const Store = types.compose(
    storeName,
    LoadingState,
    types
      .model({
        items: types.array(Model),
        parentProjectId: TNullOrOptionalString,
        selectedItem: types.maybe(types.late(() => Model))
      })
      .volatile(self => ({
        errors: null
      }))
      .actions((self: any) => {
        let myCollection = collection
        const load = flow(function*() {
          self.setState(LoadingStates.PENDING)
          // todo: howto create a pre filtered collection for level 2 stores
          if (getType(self).name === "ChildrenStore" && self.parentProjectId) {
            myCollection = COREJS_APP.projects
              .getById(self.parentProjectId)
              .expand("Children($levels=max)")
          }
          self.errors = null
          try {
            let items = yield myCollection.get()
            // Todo: Abstract logic in preprocessnapshot.
            // This is a bit cryptic. We're asking for a toplevel Project with Children and have to remove the phantom root task
            if (!Array.isArray(items)) {
              if (
                items.Children &&
                items.Children.length === 1 &&
                items.Children[0].Cn_ParentId === null &&
                items.Children[0].Children
              ) {
                items = items.Children[0].Children
              }
            }
            self.items = items
            self.setState(LoadingStates.DONE)
          } catch (err) {
            self.setState(LoadingStates.ERROR)
            self.errors = err
          }
        })

        function addOrUpdateItem(item: any = {}) {
          const existingItem = self.items.find(i => i.uid === item.uid)
          if (existingItem) {
            applySnapshot(existingItem, item)
            return existingItem
          } else {
            const newItem = Model.create(item)
            self.items.unshift(newItem)
            return newItem
          }
        }

        function removeItem(item: any) {
          detach(item)
          return item
        }

        return {
          addOrUpdateItem,
          removeItem,
          load
        }
      })
  )

  return Store
}

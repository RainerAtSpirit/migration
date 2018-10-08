import * as corejs from "@coras/corejs"
import {
  applySnapshot,
  destroy,
  detach,
  flow,
  getParent,
  getType,
  IModelType,
  Instance,
  ModelProperties,
  resolveIdentifier,
  types
} from "mobx-state-tree"
import { LoadingState } from "../common"
import { LoadingStates, TNullOrOptionalString } from "../types"
import { COREJS_APP } from "./../../constants"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = any

export const createChildStore = <P extends ModelProperties, O, C, S, T>(
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
        selectedItem: types.maybe(types.reference(Model)),
        detailViewRootItem: types.maybe(Model),
        parentProjectId: TNullOrOptionalString,
        isRoot: types.maybe(types.boolean),
        Cn_ParentId: TNullOrOptionalString,
        Id: TNullOrOptionalString
      })
      .volatile(self => ({
        errors: null
      }))
      .actions((self: any) => {
        let myCollection = collection
        let method = "get"
        const load = flow(function*() {
          self.setState(LoadingStates.PENDING)
          // todo: howto create a pre filtered collection for level 2 stores
          if (self.parentProjectId) {
            myCollection = COREJS_APP.projects.getById(self.parentProjectId)

            if (self.isRoot) {
              myCollection.expand("Children($levels=max)")
            } else {
              myCollection = myCollection.items.getById(self.Id)
              method = "getRelatedChildren"
            }
          }
          self.errors = null
          try {
            let items = yield myCollection[method]()
            const parent = getParent(self)
            if ("childrenStore" in parent) {
              applySnapshot(parent, items)
            }
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
            self.items = []
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

        function getByUid(uid: string) {
          return resolveIdentifier(Model, self.items, uid)
        }

        function setSelectedItem(item: any) {
          self.selectedItem = item
        }

        function setDetailViewItem(item: any) {
          self.detailViewItem = item
        }

        return {
          addOrUpdateItem,
          getByUid,
          removeItem,
          load,
          setDetailViewItem,
          setSelectedItem
        }
      })
  )

  return Store
}

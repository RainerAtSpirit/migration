import * as corejs from "@coras/corejs"
import {
  applySnapshot,
  destroy,
  detach,
  flow,
  getSnapshot,
  IModelType,
  Instance,
  ModelProperties,
  resolveIdentifier,
  types,
  IAnyModelType
} from "mobx-state-tree"
import { LoadingState } from "../common"
import { LoadingStates } from "../types"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export const createStore = <IT extends IAnyModelType>(
  storeName: string,
  Model: IT,
  collection: TStrawmanCollection
) => {
  const Store = types.compose(
    storeName,
    LoadingState,
    types
      .model({
        items: types.array(Model),
        selectedItem: types.maybe(types.late(() => Model))
      })
      .actions((self: any) => {
        const load = flow(function*() {
          self.setState(LoadingStates.PENDING)
          try {
            const items = yield collection.get()
            // push item into model.properties
            // self.items = items
            items.forEach(item => self.addOrUpdateItem(Model.create(item)))
            self.setState(LoadingStates.DONE)
          } catch (err) {
            self.setState(LoadingStates.ERROR)
          }
        })

        function addOrUpdateItem(item: any = {}) {
          const existingItem = self.items.find(i => i.uid === item.uid)
          if (existingItem) {
            applySnapshot(existingItem, getSnapshot(item))
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

import * as corejs from "@coras/corejs"
import {
  applySnapshot,
  destroy,
  detach,
  flow,
  Instance,
  types
} from "mobx-state-tree"
import { LoadingState } from "../common"
import { LoadingStates } from "../types"

// We don't have an abstract corejs.Collection type.
type TStrawmanCollection = corejs.Users | corejs.Items

export function createStore(
  storeName: string,
  Model: any,
  collection: TStrawmanCollection
) {
  const Store = types.compose(
    storeName,
    LoadingState,
    types
      .model({
        items: types.array(Model),
        selectedItem: types.maybe(types.late(() => Model))
      })
      .actions((self: IStore) => {
        const load = flow(function*() {
          self.setState(LoadingStates.PENDING)
          try {
            const items = yield collection.get()
            // push item into model.properties
            self.items = items.map(i => ({ properties: i }))
            self.setState(LoadingStates.DONE)
          } catch (err) {
            self.setState(LoadingStates.ERROR)
          }
        })

        // todo: Consider persisting to server for add
        function addOrUpdateItem(item: IModel) {
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

        function removeItem(item: IModel) {
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

  interface IModel extends Instance<typeof Model> {}
  interface IStore extends Instance<typeof Store> {}

  return Store
}

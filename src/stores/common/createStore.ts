import * as corejs from "@coras/corejs"
import { applySnapshot, flow, Instance, types } from "mobx-state-tree"
import { LoadingState, Persistable } from "../common"
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
            self.items = yield collection.get()
            self.setState(LoadingStates.DONE)
          } catch (err) {
            self.setState(LoadingStates.ERROR)
          }
        })

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

        function createItem(item: IModel) {
          return Model.create(item)
        }

        function removeAndDeleteItem(item: IModel) {
          self.items.remove(item)
          return item.remove()
        }

        return {
          addOrUpdateItem,
          createItem,
          removeAndDeleteItem,
          load
        }
      })
  )

  interface IModel extends Instance<typeof Model> {}
  interface IStore extends Instance<typeof Store> {}

  const x: IStore = Store.create()

  return Store
}

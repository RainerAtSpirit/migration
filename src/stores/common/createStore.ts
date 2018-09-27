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
    LoadingState,
    types
      .model("UsersStore", {
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

        function addOrUpdate(item: IModel) {
          const existingItem = self.items.find(i => i.uid === item.uid)
          if (existingItem) {
            applySnapshot(existingItem, item)
            return existingItem
          } else {
            const newItem = Model.create(item)
            self.items.unshift(item)
            return newItem
          }
        }

        function removeAndDeleteItem(item: IModel) {
          self.items.remove(item)
          return item.remove()
        }

        return {
          addOrUpdate,
          load,
          removeAndDeleteItem
        }
      })
  )

  interface IModel extends Instance<typeof Model> {}
  interface IStore extends Instance<typeof Store> {}

  return Store
}

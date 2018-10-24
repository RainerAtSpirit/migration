import {
  applySnapshot,
  detach,
  flow,
  getParent,
  getRoot,
  getSnapshot,
  IAnyModelType,
  resolveIdentifier,
  types
} from "mobx-state-tree"
import { COREJS_APP } from "../../constants"
import { LoadingState, OrderAndSearchable } from "../common"
import { IRootStore } from "../RootStore"
import { LoadingStates, TNullOrOptionalString } from "../types"

export const createProjectStores = <IT extends IAnyModelType>({
  storeName,
  ParentModel,
  Model,
  isRootStore
}: {
  storeName: string
  ParentModel: IT
  Model: IT
  isRootStore: boolean
}) => {
  const parentOrChild = getModel(ParentModel, Model, isRootStore)
  const collection = COREJS_APP.projects
    .orderBy("Title")
    .expand("Children($levels=max)")

  const Store = types.compose(
    storeName,
    LoadingState,
    OrderAndSearchable,
    parentOrChild,
    types
      .model({})
      .volatile(self => ({
        errors: null
      }))
      .actions((self: any) => {
        let myCollection: any = collection
        let method = "get"
        const load = flow(function*() {
          self.setState(LoadingStates.PENDING)
          // todo: Check response time for root call. > 2 secs seems to be pretty long
          if (self.parentProjectId) {
            myCollection = COREJS_APP.projects.getById(self.parentProjectId)

            if (self.isParent) {
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
            applySnapshot(existingItem, getSnapshot(item))
            return existingItem
          } else {
            const newItem = ParentModel.create(item)
            self.items.unshift(newItem)
            return newItem
          }
        }

        function removeItem(item: any) {
          detach(item)
          return item
        }

        function getModelInstanceByUid(uid: string, model) {
          const whereToSeach = (getRoot(self) as IRootStore).projectsStore.items
          const existingItem = resolveIdentifier(model, whereToSeach, uid)
          return existingItem
        }

        function setSelectedItem(item: any) {
          self.selectedItem = item
        }

        function setDetailViewItem(item: any) {
          self.detailViewItem = item
        }

        return {
          addOrUpdateItem,
          getModelInstanceByUid,
          removeItem,
          load,
          setDetailViewItem,
          setSelectedItem
        }
      })
  )

  return Store

  function getModel(parent, model, isRoot) {
    const TUnionParentChild = types.union(ParentModel, Model)
    let store

    if (isRoot) {
      store = types.model({
        items: types.array(ParentModel),
        detailViewRootItem: types.maybe(TUnionParentChild),
        selectedItem: types.maybe(types.reference(TUnionParentChild))
      })
    } else {
      store = types.model({
        items: types.array(Model),
        parentProjectId: TNullOrOptionalString,
        isParent: types.maybe(types.boolean),
        Cn_ParentId: TNullOrOptionalString,
        Id: TNullOrOptionalString
      })
    }

    return store
  }
}

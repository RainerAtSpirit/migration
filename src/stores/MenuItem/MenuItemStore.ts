import {
  applySnapshot,
  destroy,
  getParentOfType,
  getRoot,
  getSnapshot,
  hasParent,
  Instance,
  onSnapshot,
  types
} from "mobx-state-tree"
import { IRootStore, RootStore } from "../RootStore"
import { OptionalString } from "../types"
import { ITEM_TYPES, MenuItemModel } from "./MenuItemModel"
const localStorage = window.localStorage
const ITEMS_COUNT_PER_VIEW = 3
const STORED_ITEMS_COUNT = 10

export const MenuItemStore = types
  .model("MenuItemStore", {
    key: OptionalString,
    items: types.maybe(types.array(MenuItemModel))
  })
  .views(self => {
    const getItemsByType = (type: string) => {
      return self.items.reduceRight((items, item) => {
        if (item.type === type && items.length < ITEMS_COUNT_PER_VIEW) {
          items.push(item)
        }
        return items
      }, [])
    }

    return {
      get storageId() {
        return (getRoot(self) as IRootStore).storageId
      },
      get bookmarkItems() {
        return getItemsByType(ITEM_TYPES.BOOKMARK) || []
      },
      get groupItems() {
        return getItemsByType(ITEM_TYPES.GROUP) || []
      },
      get portfolioItems() {
        return getItemsByType(ITEM_TYPES.PORTFOLIO) || []
      }
    }
  })
  .actions(self => {
    const saveToLocalStorage = () => {
      const data = JSON.stringify(getSnapshot(self.items))
      localStorage.setItem(self.storageId, data)
    }

    const importOldStorageItems = () => {
      const storageId = `cc-${self.storageId}`
      const itemsJson = localStorage.getItem(storageId)
      const items = itemsJson ? JSON.parse(itemsJson) : null

      const convertType = oldType => {
        switch (oldType) {
          case "portfolios":
            return ITEM_TYPES.PORTFOLIO
          case "projects":
            return ITEM_TYPES.GROUP
          case "recent":
            return ITEM_TYPES.BOOKMARK
        }
        return ""
      }

      if (items) {
        let resList = []
        Object.keys(items).forEach(key => {
          const itemGroupList = []
          items[key].forEach(value => {
            itemGroupList.push({
              itemId: value.itemId,
              type: convertType(value.type),
              date: Date.parse(value.date),
              title: value.title,
              bookmarkType: value.typeDisplay
            })
          })
          itemGroupList.sort((item1, item2) => item1.date - item2.date)
          resList = [...resList, ...itemGroupList]
        })

        // delete old storage
        localStorage.removeItem(storageId)
        return resList
      }

      return null
    }

    const loadFromLocalStorage = () => {
      const menuRecentItems = localStorage.getItem(self.storageId)
      const items =
        importOldStorageItems() ||
        (menuRecentItems ? JSON.parse(menuRecentItems) : null)

      if (types.array(MenuItemModel).is(items)) {
        applySnapshot(self, { items })
      } else {
        // console.log('menu items list structure has changed!')
        applySnapshot(self, { items: [] })
      }
    }

    const afterAttach = () => {
      if (hasParent(self)) {
        onSnapshot(self, saveToLocalStorage)
      }
    }

    const removeItem = (type: string, id: string) => {
      const item = self.items.find(i => type === i.type && i.itemId === id)
      // tslint:disable-next-line
      item && destroy(item)
    }

    const addItem = data => {
      const { type, id, title, bookmarkType } = data
      const item = MenuItemModel.create({
        type,
        itemId: id,
        title,
        date: new Date(),
        bookmarkType
      })

      // remove item with given id and type to avoid duplicates
      removeItem(type, id)

      // limit for each type
      if (self.items.filter(i => type === i.type).length > STORED_ITEMS_COUNT) {
        destroy(self.items.find(i => type === i.type))
      }

      self.items.push(item)

      return data
    }

    return {
      afterAttach,
      addItem,
      loadFromLocalStorage,
      removeItem
    }
  })

export interface IMenuItemStore extends Instance<typeof MenuItemStore> {}

import { Instance, types } from "mobx-state-tree"
import { OptionalString, TOptionalId } from "../types"

export const ITEM_TYPES = {
  BOOKMARK: "bookmark",
  GROUP: "project",
  PORTFOLIO: "portfolio"
}

export const MenuItemModel = types
  .model("MenuItemModel", {
    id: TOptionalId,
    title: OptionalString,
    itemId: OptionalString,
    type: OptionalString,
    date: types.Date,
    bookmarkType: OptionalString
  })
  .views(self => ({
    get isDeletable() {
      return self.type === ITEM_TYPES.BOOKMARK
    },
    get isBookmark() {
      return self.type === ITEM_TYPES.BOOKMARK
    }
  }))

export interface IMenuItemModel extends Instance<typeof MenuItemModel> {}

import { Instance, types } from "mobx-state-tree"
import { PanelTypes, TPanelTypes } from "../types"

export const OverlayStore = types
  .model("CurrentUserStore", {
    selectedPanel: types.maybeNull(TPanelTypes),
    isVisible: types.optional(types.boolean, false)
  })
  .actions((self: IOverlayStore) => ({
    toggleIsVisible() {
      self.isVisible = !self.isVisible
    },
    open() {
      self.isVisible = true
    },
    close() {
      self.isVisible = false
    },
    setPanel(panelType: PanelTypes) {
      self.selectedPanel = panelType
    }
  }))

export interface IOverlayStore extends Instance<typeof OverlayStore> {}

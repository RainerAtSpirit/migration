import { Instance, types } from "mobx-state-tree"
import { PanelTypes, TPanelTypes } from "../types"
import { User } from "../UsersStore"

export const OverlayStore = types
  .model("CurrentUserStore", {
    selectedPanel: types.maybeNull(TPanelTypes),
    isVisible: types.optional(types.boolean, false),
    initialValues: types.frozen()
  })
  .volatile(self => ({
    // tslint:disable-next-line
    onSubmit: function onSubmit() {}
  }))
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
    },
    setInitialValues(json) {
      self.initialValues = json
    },
    setOnSubmit(fn) {
      self.onSubmit = fn
    }
  }))

export interface IOverlayStore extends Instance<typeof OverlayStore> {}

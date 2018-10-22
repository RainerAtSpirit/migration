import { applySnapshot, Instance, types } from "mobx-state-tree"
import { PanelTypes, TPanelTypes } from "../types"
import { User } from "../UsersStore"

export const OverlayStore = types
  .model("CurrentUserStore", {
    selectedPanel: types.maybeNull(TPanelTypes),
    selectedModel: types.maybeNull(types.union(types.reference(User))), // Tasks etc.
    isVisible: types.optional(types.boolean, false),
    initialValues: types.frozen()
  })
  .volatile((self: IOverlayStore) => ({
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
      self.selectedModel = null
      self.selectedPanel = null
    },
    setPanel(panelType: PanelTypes) {
      self.selectedPanel = panelType
    },
    setInitialValues(json) {
      self.initialValues = json
    },
    setOnSubmit(fn) {
      self.onSubmit = fn
    },
    openPanel(model: any, panel: PanelTypes, onSubmit: (values: any) => void) {
      self.selectedModel = model
      self.initialValues = model.payload
      self.selectedPanel = panel
      self.onSubmit = onSubmit

      self.open()
    }
  }))

export interface IOverlayStore extends Instance<typeof OverlayStore> {}

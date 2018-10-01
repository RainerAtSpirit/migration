import { applySnapshot, Instance, types } from "mobx-state-tree"
import { PanelTypes, TPanelTypes } from "../types"
import { User } from "../UsersStore"

export const OverlayStore = types
  .model("CurrentUserStore", {
    selectedPanel: types.maybeNull(TPanelTypes),
    selectedModel: types.maybeNull(types.union(types.reference(User))),
    isVisible: types.optional(types.boolean, false),
    initialValues: types.frozen()
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
    },
    setInitialValues(json) {
      self.initialValues = json
    },
    setOnSubmit(fn) {
      self.onSubmit = fn
    },
    setModel(model) {
      self.selectedModel = model.uid
      self.initialValues = model.payload
      // todo: switch on UserModel
      self.selectedPanel = "user"
      self.open()
    }
  }))
  .volatile(self => ({
    // todo: wire up server persisting
    onSubmit: function onSubmit(values) {
      const model = self.selectedModel
      if (model === null) {
        return
      }
      applySnapshot(model, { uid: model.uid, properties: { ...values } })
      // todo: consider how to deal with network/server errors
      // e.g. immediately close modal, indicate errors on the card
      model.asyncPersist()
      self.close()
      // vs. wait for promise return before close
      // return model.asyncPersist().then(() => self.close())
    }
  }))

export interface IOverlayStore extends Instance<typeof OverlayStore> {}

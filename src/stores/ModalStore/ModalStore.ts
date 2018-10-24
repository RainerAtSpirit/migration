import { applySnapshot, Instance, types } from "mobx-state-tree"
import { ModalTypes, TModalTypes } from "../types"
import { User } from "../UsersStore"

export const ModalStore = types
  .model("ModalStore", {
    selectedModal: types.maybeNull(TModalTypes),
    selectedModel: types.maybeNull(
      types.union(types.reference(User), types.frozen())
    ), // Tasks etc.
    isVisible: types.optional(types.boolean, false),
    initialValues: types.frozen()
  })
  .volatile((self: IModalStore) => ({
    // tslint:disable-next-line
    onSubmit: function onSubmit() {}
  }))
  .actions((self: IModalStore) => ({
    toggleIsVisible() {
      self.isVisible = !self.isVisible
    },
    open() {
      self.isVisible = true
    },
    close() {
      self.isVisible = false
      self.selectedModel = null
      self.selectedModal = null
    },
    setModal(modalType: ModalTypes) {
      self.selectedPanel = modalType
    },
    setInitialValues(json) {
      self.initialValues = json
    },
    setOnSubmit(fn) {
      self.onSubmit = fn
    },
    openModal(model: any, modal: ModalTypes, onSubmit: (values: any) => void) {
      self.selectedModel = model
      self.initialValues = model && model.payload ? model.payload : model
      self.selectedModal = modal
      self.onSubmit = onSubmit

      self.open()
    }
  }))

export interface IModalStore extends Instance<typeof ModalStore> {}

import { applySnapshot, Instance, types } from "mobx-state-tree"
import { ModalTypes, TModalTypes } from "../types"
import { User } from "../UsersStore"

interface IValues {
  header: string
  content: string
}

export const ModalStore = types
  .model("ModalStore", {
    selectedModal: types.maybeNull(TModalTypes),
    isVisible: types.optional(types.boolean, false),
    values: types.optional(types.frozen<IValues>(), { header: "", content: "" })
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
    onClose() {
      self.isVisible = false
      self.values = null
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
    openModal(values: IValues, modal: ModalTypes, onSubmit: () => void) {
      self.values = values
      self.selectedModal = modal
      self.onSubmit = onSubmit

      self.open()
    }
  }))

export interface IModalStore extends Instance<typeof ModalStore> {}

import { observer } from "mobx-react"
import * as React from "react"
import { IModalStore } from "../../stores/ModalStore"
import { ModalTypes } from "../../stores/types"
import { ConfirmDeleteModal, Modal1 } from "./modal/"

export type TModalComponentMap = { [key in ModalTypes]: any }

export interface IModalProps {
  modalStore: IModalStore
}

export const CorasModal: React.SFC<IModalProps> = observer(
  ({ modalStore, modalStore: { isVisible }, ...props }: IModalProps) => {
    if (!isVisible) {
      return null
    }

    const {
      onClose,
      onSubmit,
      values: { header, content }
    } = modalStore

    const Modal: TModalComponentMap = {
      modal1: <Modal1 modalStore={modalStore} />,
      alert: <Modal1 modalStore={modalStore} />,
      // explicitly map modalStore to Component props
      confirmRemove: (
        <ConfirmDeleteModal
          isOpen={isVisible}
          onClose={onClose}
          onSubmit={onSubmit}
          header={header}
          content={content}
        />
      )
    }

    return modalStore.selectedModal ? Modal[modalStore.selectedModal] : null
  }
)

CorasModal.displayName = "CorasModal"

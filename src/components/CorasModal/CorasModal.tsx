import { observer } from "mobx-react"
import * as React from "react"
import { IModalStore } from "../../stores/ModalStore"
import { ModalTypes } from "../../stores/types"
import { Modal1 } from "./modal/"

export type TModalComponentMap = { [key in ModalTypes]: any }

export interface IModalProps {
  modalStore: IModalStore
}

export const CorasModal: React.SFC<IModalProps> = observer(
  ({ modalStore, ...props }: IModalProps) => {
    const Modal: TModalComponentMap = {
      modal1: <Modal1 modalStore={modalStore} />,
      alert: <Modal1 modalStore={modalStore} />,
      confirmRemove: <Modal1 modalStore={modalStore} />
    }

    return modalStore.selectedModal ? Modal[modalStore.selectedModal] : null
  }
)

CorasModal.displayName = "CorasModal"

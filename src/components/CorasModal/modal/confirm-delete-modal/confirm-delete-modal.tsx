import { observer } from "mobx-react"
import * as React from "react"
import { Header, Modal } from "semantic-ui-react"

interface IConfirmDeleteModal {
  onSubmit: () => void
  onClose: () => void
  isOpen: boolean
  header: string
  content: string
}

export const ConfirmDeleteModal: React.SFC<IConfirmDeleteModal> = observer(
  ({
    isOpen,
    onSubmit,
    header,
    content,
    onClose,
    ...props
  }: IConfirmDeleteModal) => {
    return (
      <Modal
        className="cm-confirm-delete"
        open={isOpen}
        onClose={onClose}
        header={<Header icon="exclamation circle" content={header} />}
        content={content}
        actions={[
          { key: "cancel", content: "cancel", onClick: onClose },
          { key: "delete", content: "delete", onClick: onSubmit }
        ]}
      />
    )
  }
)

ConfirmDeleteModal.displayName = "ConfirmDeleteModal"

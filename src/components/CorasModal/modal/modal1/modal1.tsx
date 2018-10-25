import { observer } from "mobx-react"
import * as React from "react"
import { Button, Header, Icon, Modal } from "semantic-ui-react"

// Bad example: Way to tightly coupled to modalStore
export const Modal1 = observer(({ modalStore, ...props }) => (
  <Modal
    open={modalStore.isVisible}
    onClose={modalStore.toggleIsVisible}
    size="small"
  >
    <Header icon="browser" content={modalStore.values.header} />
    <Modal.Content>
      <h3>{modalStore.values.content}</h3>
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" onClick={modalStore.onSubmit}>
        <Icon name="checkmark" /> Got it
      </Button>
    </Modal.Actions>
  </Modal>
))

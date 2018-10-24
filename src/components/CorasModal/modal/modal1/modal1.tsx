import { observer } from "mobx-react"
import * as React from "react"
import { Button, Header, Icon, Modal } from "semantic-ui-react"

export const Modal1 = observer(({ modalStore, ...props }) => (
  <Modal
    open={modalStore.isVisible}
    onClose={modalStore.toggleIsVisible}
    size="small"
  >
    <Header icon="browser" content="Cookies policy" />
    <Modal.Content>
      <h3>This website uses cookies to ensure the best user experience.</h3>
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" onClick={modalStore.onSubmit}>
        <Icon name="checkmark" /> Got it
      </Button>
    </Modal.Actions>
  </Modal>
))

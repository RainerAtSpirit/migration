import { observer } from "mobx-react"
import * as React from "react"
import "../cm-user-settings-overlay-panel/cm-user-settings-overlay-panel.less"
import { Panel } from "./ManageNextSkin"
import { UserForm } from "./UserForm"

export const UserSettingsOverlayPanel = observer(props => (
  <Panel>
    <UserForm {...props} />
  </Panel>
))

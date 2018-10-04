import { observer } from "mobx-react"
import * as React from "react"
import "../cm-user-settings-overlay-panel/cm-user-settings-overlay-panel.less"
import { UserForm } from "./UserForm"

export const UserSettingsOverlayPanel = observer(({ ...props }) => (
  <div className="cm-user-settings-overlay-panel">
    <div className="account-header">
      <div className="settings-img">
        <div className="img">
          <i className="material-icons">settings</i>
        </div>
      </div>
      <div className="view-title">
        <span className="content">Account settings</span>
      </div>
    </div>
    <div className="settings-main">
      <UserForm {...props} />
    </div>
  </div>
))

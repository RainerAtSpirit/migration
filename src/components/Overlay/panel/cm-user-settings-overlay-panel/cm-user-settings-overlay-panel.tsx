import { inject, observer } from "mobx-react"
import * as React from "react"
import { ICurrentUser, ICurrentUserStore, IRootStore } from "../../../../stores"
import "../cm-user-settings-overlay-panel.less"
import { CorasIcon } from "../../../CorasIcons/CorasIcons"

export interface ICmUserSettingsOverlayPanel {
  store?: IRootStore
}

export const CmUserSettingsOverlayPanel: React.SFC<
  ICmUserSettingsOverlayPanel
> = inject("store")(
  observer(({ store, ...props }) => {
    const currentUserStore: ICurrentUserStore = store.currentUserStore

    function setDisplayName(e) {
      currentUserStore.user.setDisplayName(e.target.value)
    }

    function setEmail(e) {
      currentUserStore.user.setEmail(e.target.value)
    }

    function renderImageOrLetter(user: ICurrentUser) {
      return (
        <div className="details-content">
          <div className="upload-container">
            <div className="loading-indicator">
              <span className="fa fa-spinner fa-pulse fa-3x fa-fw" />
            </div>
            <input name="profileImage" className="fileUpload" type="file" />
          </div>

          {user.isImageAvailable ? (
            <div className="user-profile-img">
              <div
                className="img"
                style={{ backgroundImage: `url(${user.ProfileImageUrl})` }}
              />
            </div>
          ) : (
            <div className="user-profile-letter">
              <div className="first-letter pull-left" />
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="cm-user-settings-overlay-panel">
        <div className="account-header">
          <div className="settings-img">
            <div className="img">
              <CorasIcon name="SETTINGS" />
            </div>
          </div>
          <div className="view-title">
            <span className="content">Account settings</span>
          </div>
        </div>

        <div className="settings-main">
          <div className="details-label">
            <span>Display name</span>
          </div>
          <div className="details-content">
            <input
              id="DisplayName"
              type="text"
              className="content"
              value={currentUserStore.user.DisplayName}
              onChange={setDisplayName}
            />
            {currentUserStore.user.isDisplayNameEmpty ? (
              <div>Display name shouldn't be empty</div>
            ) : null}
          </div>

          <div className="details-label">
            <span>Profile image</span>
          </div>

          {renderImageOrLetter(currentUserStore.user)}

          <div className="details-label">
            <span>Email</span>
          </div>
          <div className="details-content">
            <input
              id="Email"
              type="text"
              className="content"
              value={currentUserStore.user.Email}
              onChange={setEmail}
            />
            {currentUserStore.user.isEmailEmpty ? (
              <div>Email shouldn't be empty</div>
            ) : null}
          </div>

          <div className="detail-row">
            <div className="row-label">
              <span>Daily email notification</span>
            </div>
            <div className="row-content">
              <div className="my-checkbox">
                <CorasIcon name="CHECK" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
)

CmUserSettingsOverlayPanel.displayName = "CmUserSettingsOverlayPanel"

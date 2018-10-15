import { inject, observer } from "mobx-react"
import { cast } from "mobx-state-tree"
import * as React from "react"
import { Button, Card, Header, Icon, Image, Loader } from "semantic-ui-react"
import {
  ConfirmDeleteButton,
  IConfirmDeleteConfig,
  TriggerType
} from "../../../components/ConfirmDeleteButton/index"
import { IUser, IUserProps } from "../../../stores/UsersStore/index"
import "./corasusercard.less"

interface ICorasUserCardProps {
  handleEdit: () => void
  handleRemove: () => void
  user: IUser
  isRemoveDisabled?: boolean
}

export const CorasUserCard: React.SFC<ICorasUserCardProps> = observer(
  ({
    handleEdit,
    handleRemove,
    user,
    isRemoveDisabled = false,
    ...props
  }: ICorasUserCardProps) => {
    const { properties } = user

    const confirmDeleteConfig: IConfirmDeleteConfig = {
      onDelete: handleRemove,
      header: "Delete User",
      content: `Are you sure you want to delete the user ${
        properties.DisplayName
      }`,
      trigger: TriggerType.Button
    }

    function renderImageOrPlaceholder(src) {
      return src ? (
        <div className="img" style={{ backgroundImage: `url('${src}')` }} />
      ) : (
        <div className="icon">
          <i className="material-icons">person</i>
        </div>
      )
    }

    return (
      <div className="user-card">
        <div className="card-upper">
          <div className="user-image">
            {renderImageOrPlaceholder(properties.ProfileImageUrl)}
          </div>
          <div className="user-details">
            <div className="name">
              <span>{properties.DisplayName}</span>
            </div>
            <div className="user-other">
              <div className="detail email">
                <span className="cs-content" title={properties.Title}>
                  {properties.Email}
                </span>
                <div className="label-container">
                  <i className="material-icons">email</i>
                  <span className="cs-label">email</span>
                </div>
              </div>
              <div className="detail username">
                <span className="cs-content">{properties.UserName}</span>
                <div className="label-container">
                  <i className="material-icons">verified_user</i>
                  <span className="cs-label">username</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-lower">
          <div className="coras-btn-style-2">
            <span onClick={handleEdit}>edit</span>
          </div>
          <div className="coras-btn-style-2">
            <span onClick={handleRemove}>remove</span>
          </div>
        </div>
      </div>
    )
  }
)

CorasUserCard.displayName = "CorasUserCard"

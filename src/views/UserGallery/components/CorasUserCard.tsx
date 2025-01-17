import { observer } from "mobx-react"
import * as React from "react"
import {
  ConfirmDeleteButton,
  IConfirmDeleteConfig,
  TriggerType
} from "../../../components/ConfirmDeleteButton"
import { CorasHighlight } from "../../../components/CorasHighlight"
import {
  CorasIcon,
  CorasIcons
} from "../../../components/CorasIcons/CorasIcons"
import { IUser } from "../../../stores/UsersStore"

interface ICorasUserCardProps {
  handleEdit: () => void
  handleRemove: () => void
  searchText: string
  user: IUser
  isRemoveDisabled?: boolean
}

export const CorasUserCard: React.SFC<ICorasUserCardProps> = observer(
  ({
    handleEdit,
    handleRemove,
    searchText,
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
      trigger: TriggerType.Text
    }

    function renderImageOrPlaceholder(src) {
      return src ? (
        <div className="img" style={{ backgroundImage: `url('${src}')` }} />
      ) : (
        <div className="icon">
          <CorasIcon name="PERSON" />
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
              <CorasHighlight
                search={searchText}
                text={properties.DisplayName}
              />
            </div>
            <div className="user-other">
              <div className="detail email">
                <span className="cs-content" title={properties.Email}>
                  <CorasHighlight search={searchText} text={properties.Email} />
                </span>
                <div className="label-container">
                  <CorasIcon name="EMAIL" />
                  <span className="cs-label">email</span>
                </div>
              </div>
              <div className="detail username">
                <span className="cs-content">{properties.UserName}</span>
                <div className="label-container">
                  <CorasIcon name="VERIFIED_USER" />
                  <span className="cs-label">username</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-lower">
          <button className="coras-btn-style-2">
            <span onClick={handleEdit}>edit</span>
          </button>
          <ConfirmDeleteButton
            basic={true}
            color="red"
            disabled={isRemoveDisabled}
            confirmDeleteConfig={confirmDeleteConfig}
          >
            remove
          </ConfirmDeleteButton>
        </div>
      </div>
    )
  }
)

CorasUserCard.displayName = "CorasUserCard"

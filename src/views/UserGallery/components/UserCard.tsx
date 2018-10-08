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

interface IUserCardProps {
  handleEdit: () => void
  handleRemove: () => void
  user: IUser
  isRemoveDisabled?: boolean
}

export const UserCard: React.SFC<IUserCardProps> = observer(
  ({
    handleEdit,
    handleRemove,
    user,
    isRemoveDisabled = false,
    ...props
  }: IUserCardProps) => {
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
      const imageOrPlaceholder = src ? (
        <Image floated="right" size="mini" circular={true} src={src} />
      ) : (
        <Icon name="user" />
      )

      return <Header floated={"right"}>{imageOrPlaceholder}</Header>
    }

    return (
      <Card color={!user.isValid ? "red" : null}>
        <Card.Content>
          {renderImageOrPlaceholder(properties.ProfileImageUrl)}
          <Card.Header>{properties.DisplayName}</Card.Header>
          <Card.Meta>{properties.Email}</Card.Meta>
          <Card.Description>UserName: {properties.UserName}</Card.Description>
        </Card.Content>
        <Card.Content extra={true}>
          <Button
            loading={user.isPending}
            basic={true}
            color="green"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <ConfirmDeleteButton
            basic={true}
            color="red"
            disabled={isRemoveDisabled}
            confirmDeleteConfig={confirmDeleteConfig}
          >
            Remove
          </ConfirmDeleteButton>
        </Card.Content>
      </Card>
    )
  }
)

UserCard.displayName = "UserCard"

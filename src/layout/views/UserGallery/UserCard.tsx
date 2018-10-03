import { inject, observer } from "mobx-react"
import { cast } from "mobx-state-tree"
import * as React from "react"
import { Button, Card, Header, Icon, Image, Loader } from "semantic-ui-react"
import {
  ConfirmDeleteButton,
  IConfirmDeleteConfig,
  TriggerType
} from "../../../components/ConfirmDeleteButton"
import { IUser, IUserProps } from "../../../stores/UsersStore"

interface IUserCardProps {
  handleEdit: () => void
  handleRemove: () => void
  user: IUser
}

export const UserCard: React.SFC<IUserCardProps> = inject("store")(
  observer(({ handleEdit, handleRemove, user, ...props }: IUserCardProps) => {
    const { properties } = user

    const confirmDeleteConfig: IConfirmDeleteConfig = {
      onDelete: handleRemove,
      header: "Delete User",
      content: `Are you sure you want to delete the user ${
        properties.DisplayName
      }`,
      trigger: TriggerType.IconOnly
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
            disabled={false}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <ConfirmDeleteButton confirmDeleteConfig={confirmDeleteConfig}>
            Remove
          </ConfirmDeleteButton>
        </Card.Content>
      </Card>
    )
  })
)

UserCard.displayName = "UserCard"

import { inject, observer } from "mobx-react"
import { cast } from "mobx-state-tree"
import * as React from "react"
import { Button, Card, Header, Icon, Image, Loader } from "semantic-ui-react"
import { IUser, IUserProps } from "../../../stores/UsersStore"

interface IUserCardProps {
  handleOpen: () => void
  user: IUser
}

export const UserCard: React.SFC<IUserCardProps> = inject("store")(
  observer(({ handleOpen, user, ...props }: IUserCardProps) => {
    const userProperties: IUserProps = cast(user.properties)
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
          {renderImageOrPlaceholder(userProperties.ProfileImageUrl)}
          <Card.Header>{userProperties.DisplayName}</Card.Header>
          <Card.Meta>{userProperties.Email}</Card.Meta>
          <Card.Description>
            UserName: {userProperties.UserName}
          </Card.Description>
        </Card.Content>
        <Card.Content extra={true}>
          <Button.Group>
            <Button
              loading={user.isPending}
              basic={true}
              color="green"
              disabled={false}
              onClick={handleOpen}
            >
              Edit
            </Button>
            <Button basic={true} color="red" disabled={true}>
              Remove
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    )
  })
)

UserCard.displayName = "UserCard"

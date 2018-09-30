import { observer } from "mobx-react"
import * as React from "react"
import { Button, Card, Header, Icon, Image } from "semantic-ui-react"
import { IUser } from "../../../stores/UsersStore"

interface IUserCardProps {
  user: IUser
}

export const UserCard: React.SFC<IUserCardProps> = observer(
  ({ user, ...props }: IUserCardProps) => {
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
          {renderImageOrPlaceholder(user.ProfileImageUrl)}
          <Card.Header>{user.DisplayName}</Card.Header>
          <Card.Meta>{user.Email}</Card.Meta>
          <Card.Description>UserName: {user.UserName}</Card.Description>
        </Card.Content>
        <Card.Content extra={true}>
          <div className="ui two buttons">
            <Button basic={true} color="green" disabled={true}>
              Edit
            </Button>
            <Button basic={true} color="red" disabled={true}>
              Remove
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
)

UserCard.displayName = "UserCard"

import { observer } from "mobx-react"
import { cast } from "mobx-state-tree"
import * as React from "react"
import { Button, Card, Header, Icon, Image } from "semantic-ui-react"
import { IUser, IUserProps } from "../../../stores/UsersStore"

interface IUserCardProps {
  user: IUser
}

export const UserCard: React.SFC<IUserCardProps> = observer(
  ({ user, ...props }: IUserCardProps) => {
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

import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Card, Segment } from "semantic-ui-react"
import { UserCard } from "./UserCard"
import { UserGalleryMenu } from "./UserGalleryMenu"

// tslint:disable-next-line
@inject("routerStore", "store")
@observer
export class Usergallery extends React.Component {
  constructor(props) {
    super(props)
    // Todo: Consider who's responsible to load users. RootStore | RouterStore | "Layout/Views Component" | Component
    // this approach has the downside that  it's using a Class constructor instead of a SFC
    // the below would work best a workbox stale-while-revalidate strategy
    // https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate
    props.store.usersStore.load()
  }

  public render() {
    const { routerStore, store }: any = this.props

    return (
      <div>
        <Segment clearing={true}>
          <h1>placeholder for gallery menu: search, filter etc.</h1>
          <h3>
            todo: Create layout component with fixed menu (scroll content)
          </h3>
          <UserGalleryMenu />
        </Segment>
        <Card.Group>
          {store.usersStore.items.map(user => (
            <UserCard key={user.uid} user={user} />
          ))}
        </Card.Group>
      </div>
    )
  }
}

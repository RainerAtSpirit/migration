import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"

@inject("routerStore", "store")
@observer
export class Usergallery extends React.Component {
  // Todo: Consider who's responsible to load users. RootStore | RouterStore | "View Component" | Component
  constructor(props) {
    super(props)
    // the below would work best a workbox stale-while-revalidate strategy
    // https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate
    props.store.usersStore.load()
  }

  public render() {
    const { routerStore, store }: any = this.props

    return (
      <div>
        <h1>Usergallery</h1>
        <h2>We have {store.usersStore.items.length} users</h2>

        <ul>
          {store.usersStore.items.map(user => (
            <li key={user.Id}>{user.DisplayName}</li>
          ))}
        </ul>
        <Link routerStore={routerStore} routeName="home">
          Go to home
        </Link>
      </div>
    )
  }
}

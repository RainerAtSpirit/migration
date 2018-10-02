import { inject, observer } from "mobx-react"
import { applySnapshot } from "mobx-state-tree"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Card, Segment } from "semantic-ui-react"
import { IOverlayStore, IRootStore, IUsersStore, User } from "../../../stores"
import { UserCard } from "./UserCard"
import { UserGalleryMenu } from "./UserGalleryMenu"

interface IUserGalleryProps {
  store?: IRootStore
}

// todo: convert into SFC

@inject("store")
@observer
export class Usergallery extends React.Component<IUserGalleryProps> {
  constructor(props) {
    super(props)
    // Todo: Consider who's responsible to load users. RootStore | RouterStore | "Layout/Views Component" | Component
    // this approach has the downside that  it's using a Class constructor instead of a SFC
    // the below would work best a workbox stale-while-revalidate strategy
    // https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate
    props.store.usersStore.load()
  }

  public render() {
    const store: IRootStore = this.props.store
    const overlayStore: IOverlayStore = store.overlayStore
    const usersStore: IUsersStore = store.usersStore

    // implement update logic. Here existing or new item is updated,
    // then added to the userstore collection before is perstists to the server and the overlay get's close.d.
    const createOnSubmitMethod = (model, collection, overlay) => values => {
      if (model === null) {
        return
      }
      applySnapshot(model, { uid: model.uid, properties: { ...values } })

      collection.addOrUpdateItem(model)

      // todo: consider how to deal with network/server errors
      // e.g. immediately close modal, indicate errors on the card like

      model.asyncPersist()
      overlay.close()

      // vs. wait for promise return before close
      // return model.asyncPersist().then(() => self.close())
    }
    const handleNew = () => {
      const newUser = User.create()
      overlayStore.openPanel(
        User.create(),
        "user",
        createOnSubmitMethod(newUser, usersStore, overlayStore)
      )
    }

    return (
      <div>
        <Segment clearing={true}>
          <h1>placeholder for gallery menu: search, filter etc.</h1>
          <h3>
            todo: Create layout component with fixed menu (scroll content)
          </h3>
          <UserGalleryMenu handleNew={handleNew} />
        </Segment>
        <Card.Group>
          {store.usersStore.items.map(user => {
            const handleOpen = () =>
              overlayStore.openPanel(
                user,
                "user",
                createOnSubmitMethod(user, usersStore, overlayStore)
              )
            return (
              <UserCard key={user.uid} user={user} handleOpen={handleOpen} />
            )
          })}
        </Card.Group>
      </div>
    )
  }
}

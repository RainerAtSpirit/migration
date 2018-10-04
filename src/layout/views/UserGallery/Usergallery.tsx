import * as csstips from "csstips"
import { inject, observer } from "mobx-react"
import { applySnapshot, destroy } from "mobx-state-tree"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Card, Segment } from "semantic-ui-react"
import { style } from "typestyle"
import {
  ICurrentUserStore,
  IOverlayStore,
  IRootStore,
  IUsersStore,
  User
} from "../../../stores"
import { FlexContainer } from "../../FlexContainer"
import "./user-gallery.less"
import { UserCard } from "./UserCard"
import { UserGalleryMenu } from "./UserGalleryMenu"
import { MainTopMenu, MainContent } from "../../"
interface IUserGalleryProps {
  store?: IRootStore
}

// todo: convert into SFC

@inject("store")
@observer
export class Usergallery extends React.Component<IUserGalleryProps> {
  constructor(props: IUserGalleryProps) {
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
    const currentUserStore: ICurrentUserStore = store.currentUserStore
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
      const newUser = User.create({ properties: {} })
      overlayStore.openPanel(
        newUser,
        "user",
        createOnSubmitMethod(newUser, usersStore, overlayStore)
      )
    }

    return (
      <>
        <MainTopMenu>
          <UserGalleryMenu handleNew={handleNew} />
        </MainTopMenu>
        <MainContent>
          <Card.Group>
            {store.usersStore.items.map(user => {
              const handleEdit = () =>
                overlayStore.openPanel(
                  user,
                  "user",
                  createOnSubmitMethod(user, usersStore, overlayStore)
                )
              const handleRemove = () => {
                user.asyncRemove().then(() => usersStore.removeItem(user))
              }
              const isRemoveDisabled =
                currentUserStore.user.Id === user.properties.Id
              return (
                <UserCard
                  key={user.uid}
                  user={user}
                  handleRemove={handleRemove}
                  handleEdit={handleEdit}
                  isRemoveDisabled={isRemoveDisabled}
                />
              )
            })}
          </Card.Group>
        </MainContent>
      </>
    )
  }
}

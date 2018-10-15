import { inject, observer } from "mobx-react"
import { applySnapshot } from "mobx-state-tree"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Card } from "semantic-ui-react"
import { LayoutMainContent, LayoutMainTopMenu } from "../../layout/index"
import {
  ICurrentUserStore,
  IOverlayStore,
  IRootStore,
  IUsersStore,
  User
} from "../../stores/index"
import { CorasUserCard } from "./components/CorasUserCard"
import { UserCard } from "./components/UserCard"
import { UserGalleryMenu } from "./components/UserGalleryMenu"
import "./user-gallery.less"

interface IUserGalleryProps {
  store?: IRootStore
}

export const UsergalleryView: React.SFC<IUserGalleryProps> = inject("store")(
  observer(({ store, ...props }: IUserGalleryProps) => {
    const overlayStore: IOverlayStore = store.overlayStore
    const usersStore: IUsersStore = store.usersStore
    const currentUserStore: ICurrentUserStore = store.currentUserStore
    // implement update logic. Here existing or new item is updated,
    // then added to the userstore collection before is persists to the server and the overlay get's closed.
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
      const newUser = User.create({})
      overlayStore.openPanel(
        newUser,
        "user",
        createOnSubmitMethod(newUser, usersStore, overlayStore)
      )
    }

    return (
      <>
        <LayoutMainTopMenu>
          <UserGalleryMenu handleNew={handleNew} />
        </LayoutMainTopMenu>
        <LayoutMainContent>
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
                <CorasUserCard
                  key={user.uid}
                  user={user}
                  handleRemove={handleRemove}
                  handleEdit={handleEdit}
                  isRemoveDisabled={isRemoveDisabled}
                />
              )
            })}
          </Card.Group>
        </LayoutMainContent>
      </>
    )
  })
)

UsergalleryView.displayName = "UsergalleryView"

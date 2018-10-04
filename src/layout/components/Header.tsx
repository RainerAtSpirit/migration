import { inject, observer } from "mobx-react"
import * as React from "react"
import { CurrentUserMenu, Menu, Overlay } from "../../components/index"
import { IRootStore } from "../../stores/index"
import "./Header.less"

interface IHeader {
  store?: IRootStore
  routerStore?: any
}

export const Header: React.SFC<IHeader> = inject("store", "routerStore")(
  observer(({ store, routerStore, ...props }: IHeader) => {
    return (
      <div className="cm-header">
        <Menu store={store.menuItemStore} app={store} router={routerStore} />
        <CurrentUserMenu userStore={store.currentUserStore} />
        <Overlay overlayStore={store.overlayStore} />
      </div>
    )
  })
)

Header.displayName = "Header"

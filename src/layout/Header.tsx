import { inject, observer } from "mobx-react"
import * as React from "react"
import { CurrentUserMenu, Menu, Overlay } from "../components"
import { IRootStore } from "../stores"
import "./Header.less"

interface IHeader {
  store?: IRootStore
  routerStore?: any
}

export const Header: React.SFC<IHeader> = inject("store", "routerStore")(
  observer(({ store, routerStore, ...props }: IHeader) => {
    return (
      <div className="cm-header">
        <div className="cm-header-outer">
          <div className="header-bg" />
          <Menu store={store.menuItemStore} app={store} router={routerStore} />
          <CurrentUserMenu userStore={store.currentUserStore} />
        </div>
        <Overlay overlayStore={store.overlayStore} />
      </div>
    )
  })
)

Header.displayName = "Header"

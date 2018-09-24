import { inject, observer } from "mobx-react"
import * as React from "react"
import { CurrentUserMenu } from "../components/CurrentUserMenu"
import { Menu } from "../components/Menu/Menu"
import { Overlay } from "../components/Overlay/Overlay"
import "./Header.less"

interface IHeader {
  store?: any
}

export const Header: React.SFC<IHeader> = inject("store", "routerStore")(
  observer(({ store, routerStore, ...props }) => {
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

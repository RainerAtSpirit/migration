import { inject, observer } from "mobx-react"
import * as React from "react"
import { CurrentUserMenu, Menu, CorasPanel } from "../../components/index"
import { IRootStore } from "../../stores/index"
import "./Header.less"

interface IHeader {
  store?: IRootStore
  routerStore?: any
}

export const Header: React.SFC<IHeader> = inject("store")(
  observer(({ store, store: { routerStore }, ...props }: IHeader) => {
    return (
      <div className="cm-header">
        <Menu store={store.menuItemStore} app={store} router={routerStore} />
        <CurrentUserMenu currentUserStore={store.currentUserStore} />
      </div>
    )
  })
)

Header.displayName = "Header"

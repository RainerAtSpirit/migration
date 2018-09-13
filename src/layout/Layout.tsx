import { inject, observer } from "mobx-react"
import * as React from "react"
import { CurrentUserMenu } from "../components"
import { IRootStore } from "../stores"
import { Main, Sidebar } from "./index"

export interface ILayoutProps {
  store?: IRootStore
}

export const Layout: React.SFC<ILayoutProps> = inject("store")(
  observer(({ store }) => {
    return (
      <>
        <header className="cc__header">
          <div className="cc__header__leftBlock">
            <div className="logo">
              <img src="img/CorasLogo.png" />
            </div>
          </div>
          <div className="cc_header_user cc__header__rightBlock">
            <CurrentUserMenu userStore={store.currentUserStore} />
          </div>
        </header>
        <Main cssClass="cc__main" />
        <Sidebar cssClass="cc__left1 greyColumn" />
      </>
    )
  })
)

Layout.displayName = "Layout"

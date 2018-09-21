import { inject, observer } from "mobx-react"
import * as React from "react"
import { CurrentUserMenu } from "../components"
import { Menu } from "../components/Menu/Menu"
import { IRootStore } from "../stores"
import { Header, Main, Sidebar } from "./index"

export interface ILayoutProps {
  store?: IRootStore
}

// Todo: Refactor
export const Layout: React.SFC<ILayoutProps> = inject("store", "routerStore")(
  observer(({ store, routerStore }) => {
    return (
      <>
        <Header />
        <Main cssClass="cc__main" />
      </>
    )
  })
)

Layout.displayName = "Layout"

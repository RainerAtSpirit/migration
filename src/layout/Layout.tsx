import { inject, observer } from "mobx-react"
import * as React from "react"
import { IRootStore } from "../stores"
import { Header, Main } from "./index"

export interface ILayoutProps {
  store?: IRootStore
}

// Todo: Refactor
export const Layout: React.SFC<ILayoutProps> = inject("store", "routerStore")(
  observer(({ store, routerStore }) => {
    return (
      <>
        {store.overlayStore.isVisible ? <div className="overlay" /> : null}
        <Header />
        <Main cssClass="cc__main" />
      </>
    )
  })
)

Layout.displayName = "Layout"

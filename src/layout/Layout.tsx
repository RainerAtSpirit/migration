import { inject, observer } from "mobx-react"
import * as React from "react"
import { Dimmer } from "semantic-ui-react"
import { IRootStore } from "../stores"
import { Header, Main } from "./components"
import { FlexContainer, FlexRoot } from "./index"
import { CorasModal, CorasPanel } from "../components"

export interface ILayoutProps {
  store?: IRootStore
}

export const Layout: React.SFC<ILayoutProps> = observer(
  ({ store }: ILayoutProps) => {
    const isDimmerActive = store.isDimmerActive
    return (
      <div className="cc-layout">
        <Dimmer active={isDimmerActive} page={true} />
        <CorasPanel overlayStore={store.panelStore} />
        <CorasModal modalStore={store.modalStore} />
        <header className="cc-layout-header">
          <Header />
        </header>
        <main className="cc-layout-main">
          <Main />
        </main>
      </div>
    )
  }
)

Layout.displayName = "Layout"

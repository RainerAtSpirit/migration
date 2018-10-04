import * as csstips from "csstips"
import { inject, observer } from "mobx-react"
import * as React from "react"
import { Dimmer } from "semantic-ui-react"
import { style } from "typestyle"
import { IOverlayStore, IRootStore } from "../stores"
import { FlexContainer, FlexRoot, Header, Main } from "./index"

export interface ILayoutProps {
  store?: IRootStore
}

export const Layout: React.SFC<ILayoutProps> = inject("store")(
  observer(({ store }: ILayoutProps) => {
    const isDimmerActive = store.overlayStore.isVisible
    return (
      <FlexRoot axis={"vertical"}>
        <Dimmer active={isDimmerActive} page={true} />
        <FlexContainer flexType={"content"}>
          <Header />
        </FlexContainer>
        <FlexContainer flexType={"flex"}>
          <Main />
        </FlexContainer>
      </FlexRoot>
    )
  })
)

Layout.displayName = "Layout"

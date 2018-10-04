import { inject, observer } from "mobx-react"
import * as React from "react"
import { Dimmer } from "semantic-ui-react"
import { IRootStore } from "../stores"
import { Header, Main } from "./components"
import { FlexContainer, FlexRoot } from "./index"

export interface ILayoutProps {
  store?: IRootStore
}

export const Layout: React.SFC<ILayoutProps> = inject("store")(
  observer(({ store }: ILayoutProps) => {
    const isDimmerActive = store.isDimmerActive
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

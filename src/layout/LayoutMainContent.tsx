import * as csstips from "csstips"
import * as React from "react"
import { style } from "typestyle"
import { FlexContainer } from "./FlexContainer"
import { ILayoutProps } from "./Layout"
import { Main } from "./components"

export const LayoutMainContent: React.SFC = props => (
  <div className="cc-layout-main-content">{props.children}</div>
)

LayoutMainContent.displayName = "LayoutMainContent"

import * as csstips from "csstips"
import * as React from "react"
import { style } from "typestyle"
import { FlexContainer } from "./FlexContainer"

export const LayoutMainTopMenu: React.SFC = props => (
  <div className="cc-layout-main-top-menu">{props.children}</div>
)

LayoutMainTopMenu.displayName = "LayoutMainTopMenu"

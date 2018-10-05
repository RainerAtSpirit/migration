import * as React from "react"

export const LayoutMainContent: React.SFC = props => (
  <div className="cc-layout-main-content">{props.children}</div>
)

LayoutMainContent.displayName = "LayoutMainContent"

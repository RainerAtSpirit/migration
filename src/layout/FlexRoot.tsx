import * as csstips from "csstips"
import * as React from "react"
import { style } from "typestyle"

export interface IFlexRootProps {
  axis?: "vertical" | "horizontal"
}

const createFlexRootClass = ({ axis = "vertical", ...props }: IFlexRootProps) =>
  style(
    csstips.fillParent,
    csstips.flexRoot,
    axis === "vertical" ? csstips.vertical : csstips.horizontal
  )

export const FlexRoot: React.SFC<IFlexRootProps> = ({ children, ...props }) => {
  return <div className={createFlexRootClass(props)}>{children}</div>
}

FlexRoot.displayName = "FlexRoot"

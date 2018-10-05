import * as csstips from "csstips"
import * as React from "react"
import { classes, style } from "typestyle"

export interface IFlexRootProps {
  axis?: "vertical" | "horizontal"
  className?: string
}

const createClass = ({ axis = "vertical", ...props }: IFlexRootProps) =>
  style(
    csstips.fillParent,
    csstips.flexRoot,
    axis === "vertical" ? csstips.vertical : csstips.horizontal
  )

export const FlexRoot: React.SFC<IFlexRootProps> = ({
  children,
  className,
  ...props
}) => {
  return className ? (
    <div className={classes(className, createClass(props))}>{children} </div>
  ) : (
    <div className={createClass(props)}>{children} </div>
  )
}

FlexRoot.displayName = "FlexRoot"

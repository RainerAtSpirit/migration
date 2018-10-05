import * as csstips from "csstips"
import * as React from "react"
import { classes, style } from "typestyle"

export interface IFlexContainerProps {
  axis?: "vertical" | "horizontal"
  flexType?: "flex" | "content"
  className?: string
}

const createClass = ({
  axis = "vertical",
  flexType = "flex",
  ...props
}: IFlexContainerProps) =>
  style(
    axis === "vertical" ? csstips.vertical : csstips.horizontal,
    flexType === "flex" ? csstips.flex : csstips.content
  )

export const FlexContainer: React.SFC<IFlexContainerProps> = ({
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

FlexContainer.displayName = "FlexContainer"

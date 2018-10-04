import * as csstips from "csstips"
import * as React from "react"
import { classes, style } from "typestyle"

export interface IFlexContainerProps {
  axis?: "vertical" | "horizontal"
  flexType?: "flex" | "content"
  className?: any
}

const flexContainer = ({
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
    <div className={classes(className, flexContainer(props))}>{children} </div>
  ) : (
    <div className={flexContainer(props)}>{children} </div>
  )
}

FlexContainer.displayName = "FlexContainer"

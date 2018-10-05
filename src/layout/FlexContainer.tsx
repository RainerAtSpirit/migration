import * as csstips from "csstips"
import { observer } from "mobx-react"
import * as React from "react"
import { classes, style } from "typestyle"

export enum TFlexAxis {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal"
}

export enum TFlexType {
  FLEX = "flex",
  CONTENT = "content"
}

export interface IFlexContainerProps {
  axis?: TFlexAxis
  flexType?: TFlexType
  className?: string
}

const createClass = ({
  axis = TFlexAxis.VERTICAL,
  flexType = TFlexType.FLEX,
  ...props
}: IFlexContainerProps) =>
  style(
    axis === "vertical" ? csstips.vertical : csstips.horizontal,
    flexType === "flex" ? csstips.flex : csstips.content
  )

export const FlexContainer: React.SFC<IFlexContainerProps> = observer(
  ({ children, className, ...props }) => {
    return className ? (
      <div className={classes(className, createClass(props))}>{children} </div>
    ) : (
      <div className={createClass(props)}>{children} </div>
    )
  }
)

FlexContainer.displayName = "FlexContainer"

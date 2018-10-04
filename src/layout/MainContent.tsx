import * as csstips from "csstips"
import * as React from "react"
import { style } from "typestyle"
import { FlexContainer } from "./FlexContainer"

export const MainContent = props => (
  <FlexContainer
    flexType={"flex"}
    className={style({
      padding: "5px",
      overflowX: "hidden",
      overflowY: "auto"
    })}
  >
    {props.children}
  </FlexContainer>
)

import * as csstips from "csstips"
import * as React from "react"
import { style } from "typestyle"
import { FlexContainer } from "./FlexContainer"

export const MainTopMenu = props => (
  <FlexContainer
    flexType={"content"}
    className={style({ margin: "0 0 10px 0", padding: "5px" })}
  >
    {props.children}
  </FlexContainer>
)

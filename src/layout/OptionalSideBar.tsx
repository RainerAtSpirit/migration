import * as csstips from "csstips"
import { inject, observer } from "mobx-react"
import * as React from "react"
import { Button, Form, Header, Icon, Menu } from "semantic-ui-react"
import { style } from "typestyle"
import { IRootStore } from "../stores/RootStore"

const bg = color => ({ backgroundColor: color })

export interface IOptionalSideBarProps {
  store?: IRootStore
  className?: string
  visible?: boolean
}

export const OptionalSideBar = inject("store")(
  observer(({ store, className, visible }: IOptionalSideBarProps) => {
    return <>placeholder optional side bar</>
  })
)

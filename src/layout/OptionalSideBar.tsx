import { inject, observer } from "mobx-react"
import * as React from "react"
import { IRootStore } from "../stores/RootStore"

export interface IOptionalSideBarProps {
  store?: IRootStore
  className?: string
  visible?: boolean
}

export const OptionalSideBar: React.SFC<IOptionalSideBarProps> = inject(
  "store"
)(
  observer(({ store, className, visible }) => {
    return <>placeholder optional side bar</>
  })
)

OptionalSideBar.displayName = "OptionalSideBar"

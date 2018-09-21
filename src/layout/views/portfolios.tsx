import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"

export const Portfolios: React.SFC = inject("store", "routerStore")(
  observer(({ store, routerStore, ...props }) => {
    return (
      <div>
        <h1>Portfolio View</h1>
      </div>
    )
  })
)

Portfolios.displayName = "Portfolios"

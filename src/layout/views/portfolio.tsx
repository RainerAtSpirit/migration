import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"

export const Portfolio: React.SFC = inject("store", "routerStore")(
  observer(({ store, routerStore, ...props }) => {
    return (
      <div>
        <h1>Portfolio</h1>
        <Link routerStore={routerStore} routeName="home">
          Go to home
        </Link>
      </div>
    )
  })
)

Portfolio.displayName = "Portfolio"

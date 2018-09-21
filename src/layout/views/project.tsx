import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"

export const Project: React.SFC = inject("store", "routerStore")(
  observer(({ store, routerStore, ...props }) => {
    const { route } = routerStore
    return (
      <div>
        <h1>Project component</h1>
        <h3> Project Id: {route.params.id}</h3>
        <Link routerStore={routerStore} routeName="home">
          Go to home
        </Link>
      </div>
    )
  })
)

Project.displayName = "Project"

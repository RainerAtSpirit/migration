import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"

export const MapGallery: React.SFC = inject("store", "routerStore")(
  observer(({ store, routerStore, ...props }) => {
    const { route } = routerStore
    return (
      <div>
        <h1>MapGallery component</h1>
        <Link routerStore={routerStore} routeName="home">
          Go to home
        </Link>
      </div>
    )
  })
)

MapGallery.displayName = "MapGallery"

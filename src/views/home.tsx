import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { LayoutMainContent, LayoutMainTopMenu } from "../layout/index"
import { Routes } from "../routes"

export const Home: React.SFC = inject("store", "routerStore")(
  observer(({ route, store, routerStore, ...props }) => {
    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          <h1>Home component</h1>
          <Link routerStore={routerStore} routeName={Routes.FLEX_DEMO}>
            Go to flex demo
          </Link>
          <Link routerStore={routerStore} routeName={Routes.USERS_GALLERY}>
            Go to users gallery
          </Link>
        </LayoutMainContent>
      </>
    )
  })
)

Home.displayName = "Home"

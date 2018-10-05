import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { LayoutMainContent, LayoutMainTopMenu } from "../"
import { Routes } from "../../routes"

export const Projects: React.SFC = inject("store", "routerStore")(
  observer(({ route, store, routerStore, ...props }) => {
    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          <h1>Projects component</h1>
          <Link routerStore={routerStore} routeName={Routes.HOME}>
            Go to home
          </Link>
        </LayoutMainContent>
      </>
    )
  })
)

Projects.displayName = "Projects"

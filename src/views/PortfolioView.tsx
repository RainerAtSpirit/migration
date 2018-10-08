import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { LayoutMainContent, LayoutMainTopMenu } from "../layout/index"
import { Routes } from "../routes"

export const PortfolioView: React.SFC = inject("store", "routerStore")(
  observer(({ route, store, routerStore, ...props }) => {
    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          <h1>Portfolio component</h1>
          <h3> Portfolio Id: {route.params.id}</h3>
          <Link routerStore={routerStore} routeName={Routes.HOME}>
            Go to home
          </Link>
        </LayoutMainContent>
      </>
    )
  })
)

PortfolioView.displayName = "PortfolioView"

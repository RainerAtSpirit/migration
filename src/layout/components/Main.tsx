import { inject, observer } from "mobx-react"
import * as React from "react"
import { routeNode, RouteView } from "react-mobx-router5"
import { routes } from "../../routes"
import { IRootStore } from "../../stores/index"

const routeNodeName = "" // '' because root node

export interface IMainProps {
  store?: IRootStore
  route?: any
  children?: any
}

export const Main: React.SFC<IMainProps> = routeNode(routeNodeName)(
  inject("store")(
    observer(({ route }: IMainProps) => {
      return (
        <RouteView
          route={route}
          routes={routes}
          routeNodeName={routeNodeName}
        />
      )
    })
  )
)

Main.displayName = "Main"

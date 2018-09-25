import { inject, observer } from "mobx-react"
import * as React from "react"
import { routeNode, RouteView } from "react-mobx-router5"
import { routes } from "../routes"
import { IRootStore } from "../stores"

const routeNodeName = "" // '' because root node

export interface IMainProps {
  store?: IRootStore
  route?: any
  routerStore?: any
  children?: any
  cssClass: string
}

export const Main: React.SFC<IMainProps> = routeNode(routeNodeName)(
  inject("store")(
    observer(({ cssClass, route }: IMainProps) => {
      return (
        <main className={cssClass}>
          <div className="cc__mainarea">
            <RouteView
              route={route}
              routes={routes}
              routeNodeName={routeNodeName}
            />
          </div>
        </main>
      )
    })
  )
)

Main.displayName = "Main"

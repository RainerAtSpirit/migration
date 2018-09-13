import { inject, observer } from "mobx-react"
import * as React from "react"
import { routeNode, RouteView } from "react-mobx-router5"
import { routes } from "../routes"
import { IRootStore } from "../stores/RootStore"
import { OptionalSideBar } from "./index"

const routeNodeName = "" // '' because root node

export interface IMainProps {
  store?: IRootStore
  routerStore?: any
  children?: any
  cssClass: string
}

@routeNode(routeNodeName)
@inject("store")
@observer
export class Main extends React.Component<IMainProps> {
  public render() {
    const { route, cssClass }: any = this.props

    return (
      <main className={cssClass}>
        <div className="cc__mainarea">
          <RouteView
            route={route}
            routes={routes}
            routeNodeName={routeNodeName}
          />
        </div>
        <OptionalSideBar className="cc__right1 greyColumn" />
      </main>
    )
  }
}

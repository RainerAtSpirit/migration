import { inject, observer } from "mobx-react"
import * as React from "react"
import { routeNode, RouteView } from "react-mobx-router5"
import { Icon, Loader, Menu, Tab } from "semantic-ui-react"
import { style } from "typestyle"
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

const cssTabbarStyle = style({ marginTop: "12px" })
const Spinner = <Loader active={true} inline="centered" />

@inject("store")
@observer
class Main extends React.Component<IMainProps> {
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

export default routeNode(routeNodeName)(Main)

import * as csstips from "csstips"
import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Menu } from "semantic-ui-react"
import { style } from "typestyle"
import { IRootStore } from "../stores/RootStore"

const bg = color => ({ backgroundColor: color })

export interface ISidebar1Props {
  store?: IRootStore
  routerStore?: any
  cssClass: string
}

export const Sidebar1 = inject("routerStore")(
  observer(({ routerStore, cssClass }: ISidebar1Props) => {
    return (
      <aside className={cssClass}>
        <Menu vertical={true}>
          <Menu.Item as={Link} routerStore={routerStore} routeName="home">
            Home
          </Menu.Item>
          <Menu.Item as={Link} routerStore={routerStore} routeName="dummy">
            Dummy
          </Menu.Item>

          <Menu.Item
            as={Link}
            routerStore={routerStore}
            routeParams={{ id: "1" }}
            routeName="project"
          >
            Project 1
          </Menu.Item>
          <Menu.Item
            as={Link}
            routerStore={routerStore}
            routeParams={{ id: "234" }}
            routeName="project"
          >
            Project 234
          </Menu.Item>
        </Menu>
      </aside>
    )
  })
)

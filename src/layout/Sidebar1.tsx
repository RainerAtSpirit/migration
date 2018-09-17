import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Menu } from "semantic-ui-react"
import { IRootStore } from "../stores/RootStore"

export interface ISidebarProps {
  store?: IRootStore
  routerStore?: any
  cssClass: string
}

export const Sidebar: React.SFC<ISidebarProps> = inject("routerStore")(
  observer(({ routerStore, cssClass }) => {
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
          <Menu.Item
            as={Link}
            routerStore={routerStore}
            routeName="usergallery"
          >
            User Gallery
          </Menu.Item>
        </Menu>
      </aside>
    )
  })
)

Sidebar.displayName = "Sidebar"

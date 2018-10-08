import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Routes } from "../../../routes"
import { IProjectModel } from "../../../stores/Projectstore"
import { LayoutMainContent, LayoutMainTopMenu } from "../../index"
import { TaskList } from "./TaskList"

export const Project: React.SFC = inject("store", "routerStore")(
  observer(({ route, store, routerStore, ...props }) => {
    const selectedItem: IProjectModel = store.projectsStore.selectedItem
    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          <h1>Project component</h1>
          <h3> Project Id: {route.params.id}</h3>
          <Link routerStore={routerStore} routeName={Routes.HOME}>
            Go to home
          </Link>
          {selectedItem ? (
            <TaskList items={selectedItem.childrenStore.items} />
          ) : null}
        </LayoutMainContent>
      </>
    )
  })
)

Project.displayName = "Project"

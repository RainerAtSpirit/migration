import { inject, observer } from "mobx-react"
import { applySnapshot } from "mobx-state-tree"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Routes } from "../../../routes"
import { ProjectModel } from "../../../stores/Projectstore"
import { LayoutMainContent, LayoutMainTopMenu } from "../../index"
import { ItemState } from "./ItemState"
import { TaskList } from "./TaskList"

export const Project: React.SFC = inject("store", "routerStore")(
  observer(({ route, store, routerStore, ...props }) => {
    const state = new ItemState()
    const project = ProjectModel.create()
    applySnapshot(project, {
      properties: {
        Id: route.params.id
      },
      childrenStore: {
        isRoot: true,
        parentProjectId: route.params.id
      }
    })
    project.asyncLoad()

    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          <h1>Project component</h1>
          <h3> Project Id: {route.params.id}</h3>
          <Link routerStore={routerStore} routeName={Routes.HOME}>
            Go to home
          </Link>
          <TaskList items={project.childrenStore.items} />
        </LayoutMainContent>
      </>
    )
  })
)

Project.displayName = "Project"

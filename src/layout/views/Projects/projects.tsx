import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { List } from "semantic-ui-react"
import { LayoutMainContent, LayoutMainTopMenu } from "../../index"
import { ItemState } from "./ItemState"
import { ProjectList } from "./ProjectList"

const state = new ItemState()

export const Projects: React.SFC = inject("store", "routerStore")(
  observer(({ route, store, routerStore, ...props }) => {
    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          <h1>Projects component</h1>
          <ProjectList items={store.projectsStore.items} state={state} />
        </LayoutMainContent>
      </>
    )
  })
)

Projects.displayName = "Projects"

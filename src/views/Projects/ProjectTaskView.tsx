import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Item } from "semantic-ui-react"
import { LayoutMainContent, LayoutMainTopMenu } from "../../layout"
import { Routes } from "../../routes"
import {
  IProjectModel,
  IProjectTaskModel,
  ITaskProps
} from "../../stores/Projectstore"
import { ItemList } from "./components/ItemList"

export const ProjectTaskView: React.SFC = inject("store")(
  observer(({ route, store, ...props }) => {
    const selectedItem: IProjectTaskModel = store.projectsStore.selectedItem
    const properties: ITaskProps = selectedItem.properties
    const routerStore = store.routerStore
    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          <h1>Projects Task View component</h1>

          {// testing Intellisense
          selectedItem ? (
            <>
              <h1>{properties.Title}</h1>
              <Item>
                <Item.Content>
                  <Item.Meta>
                    Status: {properties.TaskStatusR_1508195821838}
                  </Item.Meta>
                  <Item.Description>{properties.Title}</Item.Description>
                </Item.Content>
              </Item>
              <h3>Tasks:</h3>
              <ItemList
                items={selectedItem.childrenStore.items}
                isCollapsed={true}
                isParent={true}
              />
            </>
          ) : null}
        </LayoutMainContent>
      </>
    )
  })
)

ProjectTaskView.displayName = "ProjectTaskView"

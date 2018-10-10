import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Item } from "semantic-ui-react"
import { LayoutMainContent, LayoutMainTopMenu } from "../../layout"
import { Routes } from "../../routes"
import { IProjectModel, IProjectProps } from "../../stores/Projectstore"
import { ItemList } from "./components/ItemList"

export const ProjectView: React.SFC = inject("store")(
  observer(({ route, store, ...props }) => {
    const selectedItem: IProjectModel = store.projectsStore.selectedItem
    const properties: IProjectProps = selectedItem.properties
    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          {// testing Intellisense
          selectedItem ? (
            <>
              <h1>{properties.Title}</h1>
              <Item>
                <Item.Content>
                  <Item.Meta>{properties.StatusR_1508195501183}</Item.Meta>
                  <Item.Description>
                    {properties.ProjectPriorityR_1508195501183}
                  </Item.Description>
                  <Item.Extra>
                    Cost: {properties.CostKPIR_1508195501183} <br />
                    Performance: {properties.PerformanceKPIR_1508195501183}
                  </Item.Extra>
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

ProjectView.displayName = "ProjectView"

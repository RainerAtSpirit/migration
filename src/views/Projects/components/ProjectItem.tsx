import { action, computed, observable } from "mobx"
import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { List, SemanticICONS } from "semantic-ui-react"
import { Routes } from "../../../routes"
import { IProjectModel, ITask } from "../../../stores/Projectstore/index"
import { TaskList } from "./TaskList"

interface IProjectItem {
  item: any
  state: any
  routerStore?: any
}

export const ProjectItem: React.SFC<IProjectItem> = inject("routerStore")(
  observer(({ item, state, routerStore, ...props }: IProjectItem) => {
    const { properties }: IProjectModel = item
    return (
      <List.Item onClick={state.toggleCollapsed}>
        <List.Icon name={state.icon as SemanticICONS} />
        <List.Content>
          <List.Header>
            {properties.Title}{" "}
            <Link
              routerStore={routerStore}
              routeName={Routes.PROJECT}
              routeParams={{ id: properties.Id }}
            >
              open detail view
            </Link>
          </List.Header>
        </List.Content>
        {!state.isCollapsed &&
        item.childrenStore &&
        item.childrenStore.items.length > 0 ? (
          <TaskList items={item.childrenStore.items} />
        ) : null}
      </List.Item>
    )
  })
)

ProjectItem.displayName = "ProjectItem"

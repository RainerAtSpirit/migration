import { action, computed, observable } from "mobx"
import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { List, SemanticICONS } from "semantic-ui-react"
import { Routes } from "../../../routes"
import { IRootStore } from "../../../stores"
import { IProjectTaskModel } from "../../../stores/Projectstore/index"
import { ItemList } from "./ItemList"
import { TaskList } from "./TaskList"

interface ITaskItem {
  item: any
  state: any
  store?: IRootStore
}

export const ProjectTaskItem: React.SFC<ITaskItem> = inject("store")(
  observer(
    ({ item, state, store, store: { routerStore }, ...props }: ITaskItem) => {
      const { properties }: IProjectTaskModel = item
      return (
        <List.Item onClick={state.toggleCollapsed}>
          <List.Icon name={state.icon as SemanticICONS} />
          <List.Content>
            <List.Header>
              {properties.Title}{" "}
              <Link
                routerStore={routerStore}
                routeName={Routes.PROJECT_TASK}
                routeParams={{
                  pid: properties.ParentProjectId,
                  tid: properties.Id
                }}
              >
                open task
              </Link>
            </List.Header>
            <strong>{properties.Title}</strong>: {item.typeName} Status:{" "}
            {properties.TaskStatusR_1508195821838}
          </List.Content>
          {!state.isCollapsed &&
          item.childrenStore &&
          item.childrenStore.items.length > 0 ? (
            <TaskList items={item.childrenStore.items} />
          ) : null}
        </List.Item>
      )
    }
  )
)

ProjectTaskItem.displayName = "ProjectTaskItem"

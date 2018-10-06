import { action, computed, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { List, SemanticICONS } from "semantic-ui-react"
import { IProject, ITask } from "../../../stores/Projectstore"
import { ItemState } from "./ItemState"
import { TaskList } from "./TaskList"

interface IProjectItem {
  item: any
  state: any
}

export const ProjectItem: React.SFC<IProjectItem> = observer(
  ({ item, state, ...props }: IProjectItem) => {
    const { properties }: IProject = item
    return (
      <List.Item onClick={state.toggleCollapsed}>
        <List.Icon name={state.icon as SemanticICONS} />
        <List.Content>
          <strong>ProjectItem: {properties.Title}</strong>: {item.typeName}{" "}
          Status: {properties.StatusR_1508195501183}
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

ProjectItem.displayName = "ProjectItem"

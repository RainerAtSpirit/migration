import { action, computed, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { List, SemanticICONS } from "semantic-ui-react"
import { IProjectModel, ITask } from "../../../stores/Projectstore/index"
import { ItemState } from "./ItemState"
import { TaskList } from "./TaskList"

interface ITaskItem {
  item: any
  state: any
}

export const ProjectTaskItem: React.SFC<ITaskItem> = observer(
  ({ item, state }: ITaskItem) => {
    const { properties }: ITask = item
    return (
      <List.Item onClick={state.toggleCollapsed}>
        <List.Icon name={state.icon as SemanticICONS} />
        <List.Content>
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

ProjectTaskItem.displayName = "ProjectTaskItem"

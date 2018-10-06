import { action, computed, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { List } from "semantic-ui-react"
import { ItemState } from "./ItemState"
import { TaskItem } from "./TaskItem"

interface ITasksListProps {
  items: any
}

export const TaskList: React.SFC<ITasksListProps> = observer(
  ({ items }: ITasksListProps) => (
    <List.List>
      {items.map(item => {
        return item.uid ? (
          <TaskItem key={item.uid} item={item} state={new ItemState(true)} />
        ) : null
      })}
    </List.List>
  )
)

TaskList.displayName = "TaskList"

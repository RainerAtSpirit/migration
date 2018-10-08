import { action, computed, observable } from "mobx"
import { observer } from "mobx-react"
import { getType } from "mobx-state-tree"
import * as React from "react"
import { List } from "semantic-ui-react"
import { ItemState } from "./ItemState"
import { ProjectItem } from "./ProjectItem"
import { ProjectTaskItem } from "./ProjectTaskItem"

interface IProjectListProps {
  items: any
  isCollapsed?: boolean
}

export const ItemList: React.SFC<IProjectListProps> = observer(
  ({ isCollapsed = true, items }: IProjectListProps) => {
    const itemsIsOfType = getType(items)
    return (
      <List>
        {items.map(item => {
          const itemIsOfType = getType(item).name
          const itemTypeMap = {
            ProjectTask: (
              <ProjectTaskItem
                key={item.uid}
                item={item}
                state={new ItemState(isCollapsed)}
              />
            ),
            Project: (
              <ProjectItem
                key={item.uid}
                item={item}
                state={new ItemState(isCollapsed)}
              />
            )
          }
          return item.uid && itemTypeMap[itemIsOfType]
            ? itemTypeMap[itemIsOfType]
            : null
        })}
      </List>
    )
  }
)

ItemList.displayName = "ItemList"

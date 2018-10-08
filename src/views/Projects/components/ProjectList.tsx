import { action, computed, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { List } from "semantic-ui-react"
import { ItemState } from "./ItemState"
import { ProjectItem } from "./ProjectItem"

interface IProjectListProps {
  items: any
  isCollapsed?: boolean
}

export const ProjectList: React.SFC<IProjectListProps> = observer(
  ({ isCollapsed = true, items }: IProjectListProps) => (
    <List>
      {items.map(item => {
        return item.uid ? (
          <ProjectItem
            key={item.uid}
            item={item}
            state={new ItemState(isCollapsed)}
          />
        ) : null
      })}
    </List>
  )
)

ProjectList.displayName = "ProjectList"

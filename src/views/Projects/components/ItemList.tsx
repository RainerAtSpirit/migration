import { observer } from "mobx-react"
import { getType } from "mobx-state-tree"
import * as React from "react"
import { List } from "semantic-ui-react"
import { TModelNamesMap } from "../../../stores/types"
import { ItemState } from "./ItemState"
import { ProjectItem } from "./ProjectItem"
import { ProjectTaskItem } from "./ProjectTaskItem"

const ListContent = observer(({ items, isCollapsed, ...props }) => {
  return (
    <>
      {items.map(item => {
        const itemIsOfType = getType(item).name
        const itemTypeMap: TModelNamesMap = {
          ProjectTaskModel: (
            <ProjectTaskItem
              key={item.uid}
              item={item}
              state={new ItemState(isCollapsed)}
            />
          ),
          ProjectModel: (
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
    </>
  )
})

interface ItemListProps {
  items: any
  isParent: boolean
  isCollapsed?: boolean
}

export const ItemList: React.SFC<ItemListProps> = observer(
  ({ isCollapsed = true, isParent, items }: ItemListProps) => {
    return isParent ? (
      <List>
        <ListContent items={items} isCollapsed={isCollapsed} />
      </List>
    ) : (
      <List.List>
        <ListContent items={items} isCollapsed={isCollapsed} />
      </List.List>
    )
  }
)

ItemList.displayName = "ItemList"

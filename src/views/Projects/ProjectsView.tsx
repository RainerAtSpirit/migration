import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Loader } from "semantic-ui-react"
import { LayoutMainContent, LayoutMainTopMenu } from "../../layout"
import { IRootStore } from "../../stores"
import { IProjectsStore } from "../../stores/Projectstore"
import { ItemList } from "./components/ItemList"

interface IProjectsProps {
  store: IRootStore
}

export const ProjectsView: React.SFC<IProjectsProps> = inject("store")(
  observer(({ store, ...props }: IProjectsProps) => {
    const projectStore: any = store.projectsStore
    return (
      <>
        <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
        <LayoutMainContent>
          <h1>Projects View component</h1>
          {projectStore.isPending ? (
            <Loader active={true} inline="centered" />
          ) : (
            <ItemList items={projectStore.items} isParent={true} />
          )}
        </LayoutMainContent>
      </>
    )
  })
)

import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Loader } from "semantic-ui-react"
import { IRootStore } from "../../../stores"
import { IProjectsStore } from "../../../stores/Projectstore"
import { LayoutMainContent, LayoutMainTopMenu } from "../../index"
import { ProjectList } from "./ProjectList"

interface IProjectsViewProps {
  items: any
  isPending: boolean
}

const ProjectsView: React.SFC<IProjectsViewProps> = observer(
  ({ isPending, items, ...props }) => (
    <>
      <LayoutMainTopMenu>Menu placeholder</LayoutMainTopMenu>
      <LayoutMainContent>
        <h1>Projects component</h1>
        {isPending ? (
          <Loader active={true} inline="centered" />
        ) : (
          <ProjectList items={items} />
        )}
      </LayoutMainContent>
    </>
  )
)

interface IProjectsProps {
  store: IRootStore
}

@inject("store")
@observer
export class Projects extends React.Component<IProjectsProps> {
  public projectsStore: IProjectsStore

  constructor(props) {
    super(props)
    this.projectsStore = props.store.projectsStore
  }
  public render() {
    return (
      <ProjectsView
        items={this.projectsStore.items}
        isPending={this.projectsStore.isPending}
      />
    )
  }
}

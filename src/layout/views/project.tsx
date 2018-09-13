import { inject } from "mobx-react"
import React, { MouseEvent } from "react"
import { Link } from "react-mobx-router5"

@inject("routerStore")
export class Project extends React.Component {
  public render() {
    const { routerStore, route }: any = this.props
    return (
      <div>
        <h1>Project component</h1>
        <h3> Project Id: {route.params.id}</h3>
        <Link routerStore={routerStore} routeName="home">
          Go to home
        </Link>
      </div>
    )
  }
}

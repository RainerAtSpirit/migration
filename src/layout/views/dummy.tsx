import { inject } from "mobx-react"
import React, { MouseEvent } from "react"
import { Link } from "react-mobx-router5"

@inject("routerStore")
export class Dummy extends React.Component {
  public render() {
    const { routerStore }: any = this.props

    return (
      <div>
        <h1>Dummy component</h1>
        <Link routerStore={routerStore} routeName="home">
          Go to home
        </Link>
      </div>
    )
  }
}

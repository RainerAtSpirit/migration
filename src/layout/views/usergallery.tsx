import { inject } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"

@inject("routerStore")
export class Usergallery extends React.Component {
  public render() {
    const { routerStore }: any = this.props

    return (
      <div>
        <h1>Usergallery</h1>
        <Link routerStore={routerStore} routeName="home">
          Go to home
        </Link>
      </div>
    )
  }
}

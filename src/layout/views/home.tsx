import { inject } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"

@inject("routerStore")
export class Home extends React.Component {
  public render() {
    const { routerStore }: any = this.props

    return (
      <div>
        <h1>Home view</h1>
        <div>
          <Link routerStore={routerStore} routeName="dummy">
            Go to dummy
          </Link>
        </div>
      </div>
    )
  }
}

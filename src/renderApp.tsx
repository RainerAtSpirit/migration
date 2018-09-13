import { Provider } from "mobx-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { configureRouter } from "./create-router5"
import { Layout } from "./layout"

const router = configureRouter(true)

export function renderApp(rootId: string, store: any, routerStore: any) {
  const App = (
    <Provider store={store} routerStore={routerStore}>
      <Layout />
    </Provider>
  )

  router.start((err, state) => {
    ReactDOM.render(App, document.getElementById(rootId))
  })
}

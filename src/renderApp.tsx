import { Provider } from "mobx-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { configureRouter } from "./create-router5"
import { Layout } from "./layout/Layout"

const router = configureRouter(true)

export function renderApp(rootId: string, store: any) {
  const App = (
    <Provider store={store} routerStore={store.routerStore}>
      <Layout store={store} />
    </Provider>
  )

  router.start((err, state) => {
    ReactDOM.render(App, document.getElementById(rootId))
  })
}

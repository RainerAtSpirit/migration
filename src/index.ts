import { renderApp } from "./renderApp"
import { routerStore, store } from "./stores"
import "./styles/coras.less"

const rootId = "root"
const temp = ((window as any).rootStore = store)

renderApp(rootId, store, routerStore)

// Save / Restore the state of the store while self module is hot reloaded
declare const module: any

if (module && module.hot) {
  module.hot.accept()
  renderApp(rootId, store, routerStore)
}

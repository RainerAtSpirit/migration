import { setupPage } from "csstips"
import "../my-semantic-theme/coras.less"
import { renderApp } from "./renderApp"
import { routerStore, store } from "./stores"

const rootId = "root"
const temp = ((window as any).rootStore = store)
const temp2 = ((window as any).routerStore = routerStore)

setupPage("#" + rootId)
renderApp(rootId, store, routerStore)

// Save / Restore the state of the store while self module is hot reloaded
declare const module: any

if (module && module.hot) {
  module.hot.accept()
  renderApp(rootId, store, routerStore)
}

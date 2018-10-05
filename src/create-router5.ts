import { mobxPlugin } from "mobx-router5"
import { createRouter } from "router5"
import browserPlugin from "router5/plugins/browser"
import loggerPlugin from "router5/plugins/logger"
import { routes } from "./routes"
import { routerStore } from "./stores"

const routerOptions = { defaultRoute: "dummy1" }
const browserOptions = {
  useHash: true,
  base: "./",
  mergeState: true,
  preserveHash: true
}

export function configureRouter(useLoggerPlugin = false) {
  const router = createRouter(routes, routerOptions)
    .usePlugin(mobxPlugin(routerStore))
    .usePlugin(browserPlugin(browserOptions))

  if (useLoggerPlugin) {
    router.usePlugin(loggerPlugin)
  }
  return router
}

import { Dummy, Home, Project } from "./layout/views"

export const routes = [
  // children of the root routeNode
  { name: "home", path: "/", component: Home },
  { name: "dummy", path: "/dummy", component: Dummy },
  { name: "project", path: "/project/:id", component: Project }
]

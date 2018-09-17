import { Dummy, Home, Project, Usergallery } from "./layout/views"

export const routes = [
  // children of the root routeNode
  { name: "home", path: "/", component: Home },
  { name: "dummy", path: "/dummy", component: Dummy },
  { name: "project", path: "/project/:id", component: Project },
  { name: "usergallery", path: "/usergallery", component: Usergallery }
]

import {
  Home,
  MapGallery,
  Portfolio,
  Portfolios,
  Project,
  Projects,
  Usergallery
} from "./layout/views"

export const routes = [
  // children of the root routeNode
  { name: "home", path: "/", component: Home },
  { name: "portfolios", path: "/portfolios", component: Portfolios },
  { name: "portfolio", path: "/portfolios/:id", component: Portfolio },
  { name: "projects", path: "/projects", component: Projects },
  { name: "project", path: "/project/:id", component: Project },
  { name: "mapgallery", path: "/mapgallery", component: MapGallery },
  { name: "usergallery", path: "/usergallery", component: Usergallery }
]

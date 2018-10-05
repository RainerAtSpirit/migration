import {
  Home,
  MapGallery,
  Portfolio,
  Portfolios,
  Project,
  Projects,
  Usergallery
} from "./layout/views"

export enum Routes {
  HOME = "home",
  PORTFOLIOS = "portfolios",
  PORTFOLIO = "portfolio",
  PROJECTS = "projects",
  PROJECT = "project",
  MAP_GALLERY = "mapgallery",
  USERS_GALLERY = "usersgallery"
}

export const routes = [
  // children of the root routeNode
  { name: Routes.HOME, path: "/", component: Home },
  { name: Routes.PORTFOLIOS, path: "/portfolios", component: Portfolios },
  { name: Routes.PORTFOLIO, path: "/portfolios/:id", component: Portfolio },
  { name: Routes.PROJECTS, path: "/projects", component: Projects },
  { name: Routes.PROJECT, path: "/project/:id", component: Project },
  { name: Routes.MAP_GALLERY, path: "/mapgallery", component: MapGallery },
  { name: Routes.USERS_GALLERY, path: "/usergallery", component: Usergallery }
]

import {
  FlexDemo,
  Home,
  MapGallery,
  Portfolio,
  Portfolios,
  ProjectView,
  ProjectsView,
  UsergalleryView
} from "./views/index"

export enum Routes {
  HOME = "home",
  PORTFOLIOS = "portfolios",
  PORTFOLIO = "portfolio",
  PROJECTS = "projects",
  PROJECT = "project",
  MAP_GALLERY = "mapgallery",
  USERS_GALLERY = "usersgallery",
  FLEX_DEMO = "flexdemo"
}

export const routes = [
  // children of the root routeNode
  { name: Routes.HOME, path: "/", component: Home },
  { name: Routes.PORTFOLIOS, path: "/portfolios", component: Portfolios },
  { name: Routes.PORTFOLIO, path: "/portfolios/:id", component: Portfolio },
  { name: Routes.PROJECTS, path: "/projects", component: ProjectsView },
  { name: Routes.PROJECT, path: "/project/:id", component: ProjectView },
  { name: Routes.MAP_GALLERY, path: "/mapgallery", component: MapGallery },
  {
    name: Routes.USERS_GALLERY,
    path: "/usergallery",
    component: UsergalleryView
  },
  { name: Routes.FLEX_DEMO, path: "/flexdemo", component: FlexDemo }
]

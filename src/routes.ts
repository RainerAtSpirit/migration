import {
  FlexDemo,
  Home,
  MapgalleryView,
  PortfoliosView,
  PortfolioView,
  ProjectsView,
  ProjectTaskView,
  ProjectView,
  UsergalleryView
} from "./views/index"

export enum Routes {
  HOME = "home",
  PORTFOLIOS = "portfolios",
  PORTFOLIO = "portfolio",
  PROJECTS = "projects",
  PROJECT = "project",
  PROJECT_TASK = "projecttask",
  MAP_GALLERY = "mapgallery",
  USERS_GALLERY = "usersgallery",
  FLEX_DEMO = "flexdemo"
}

export const routes = [
  // children of the root routeNode
  { name: Routes.HOME, path: "/", component: Home },
  { name: Routes.PORTFOLIOS, path: "/portfolios", component: PortfoliosView },
  { name: Routes.PORTFOLIO, path: "/portfolios/:id", component: PortfolioView },
  { name: Routes.PROJECTS, path: "/projects", component: ProjectsView },
  { name: Routes.PROJECT, path: "/project/:id", component: ProjectView },
  {
    name: Routes.PROJECT_TASK,
    path: "/projecttask/:pid/task/:tid",
    component: ProjectTaskView
  },
  { name: Routes.MAP_GALLERY, path: "/mapgallery", component: MapgalleryView },
  {
    name: Routes.USERS_GALLERY,
    path: "/usergallery",
    component: UsergalleryView
  },
  { name: Routes.FLEX_DEMO, path: "/flexdemo", component: FlexDemo }
]

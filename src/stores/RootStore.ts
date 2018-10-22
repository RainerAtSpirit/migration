import { autorun } from "mobx"
import { Instance, setLivelynessChecking, types } from "mobx-state-tree"
import { APP_ID } from "../constants"
import { Routes } from "../routes"
import { CurrentUserStore } from "./CurrentUserStore"
import { MenuItemStore } from "./MenuItem"
import { OverlayStore } from "./OverlayStore"
import { ProjectModel, ProjectsStore, ProjectTaskModel } from "./Projectstore"
import { routerStore } from "./RouterStore"
import { UsersStore } from "./UsersStore"

export const RootStore = types
  .model("RootStore", {
    appId: types.optional(types.string, APP_ID),
    currentUserStore: types.optional(CurrentUserStore, {}),
    usersStore: types.optional(UsersStore, {
      searchableProperties: ["DisplayName", "Email"],
      orderBy: [{ name: "DisplayName", dir: "asc" }]
    }),
    menuItemStore: types.optional(MenuItemStore, {}),
    overlayStore: types.optional(OverlayStore, {}),
    projectsStore: types.optional(ProjectsStore, {})
  })
  .volatile(self => ({
    routerStore
  }))
  .views((self: any) => ({
    get isDimmerActive() {
      return self.overlayStore && self.overlayStore.isVisible
    },
    get storageId() {
      return self.currentUserStore.isDone
        ? `menu-${self.appId}${self.currentUserStore.user.Id}`
        : ""
    }
  }))
  .actions((self: IRootStore) => ({
    // Todo: Generic dependency strategy
    afterCreate() {
      self.currentUserStore.load().then(() => {
        self.menuItemStore.loadFromLocalStorage()
      })
      // here's one pretty aggresive implementation that reuses project data whenever possible.
      // but adds deep linkin support when needed
      // Todo: Build production ready LoadingStrategy
      // caching should probably occur at the service worker level
      // requires Cache header on /odata endpoints
      const LoadingStrategyDisposer = autorun(() => {
        const route: any = routerStore.route
        if (route) {
          const params: any = route.params
          switch (route.name) {
            case Routes.PROJECTS:
              if (self.projectsStore.isIdle) {
                self.projectsStore.load()
              }
              break
            case Routes.PROJECT:
              let item
              if (self.projectsStore.isDone) {
                item = self.projectsStore.getModelInstanceByUid(
                  params.id,
                  ProjectModel
                )
                self.projectsStore.setSelectedItem(item)
              } else {
                item = ProjectModel.create({
                  uid: params.id,
                  properties: {
                    Id: params.id
                  },
                  childrenStore: {
                    isParent: true,
                    parentProjectId: params.id
                  }
                })
                item.asyncLoad()
                self.projectsStore.setDetailViewItem(item)
                self.projectsStore.setSelectedItem(item)
              }
              break
            case Routes.PROJECT_TASK:
              let task
              if (self.projectsStore.isDone) {
                task = self.projectsStore.getModelInstanceByUid(
                  params.tid,
                  ProjectTaskModel
                )
                self.projectsStore.setSelectedItem(task)
              } else {
                task = ProjectTaskModel.create({
                  uid: params.tid,
                  properties: {
                    Id: params.tid
                  },
                  childrenStore: {
                    isParent: false,
                    Id: params.tid,
                    parentProjectId: params.pid
                  }
                })
                task.asyncLoad()
                self.projectsStore.setDetailViewItem(task)
                self.projectsStore.setSelectedItem(task)
              }
              break

            case Routes.USERS_GALLERY:
              if (self.usersStore.isIdle) {
                self.usersStore.load()
              }
              break

            default: {
              throw new Error("Unknown Route")
            }
          }
        }
      })
    }
  }))

// setLivelynessChecking("error")

export const store = RootStore.create()
export interface IRootStore extends Instance<typeof RootStore> {}

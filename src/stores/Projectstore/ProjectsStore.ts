import { Instance } from "mobx-state-tree"
import { COREJS_APP } from "../../constants"
import { createStore } from "../common"
import { Project } from "./ProjectModel"

export const ProjectsStore = createStore(
  "UsersStore",
  Project,
  COREJS_APP.projects.orderBy("Title").expand("Children($levels=max)")
)

// Checking typescript support
// ts magic see https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const store = UsersStore.create()
// store.items[0]!.properties.

export interface IUsersStore extends Instance<typeof ProjectsStore> {}

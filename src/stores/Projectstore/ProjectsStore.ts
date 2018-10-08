import { Instance } from "mobx-state-tree"
import { COREJS_APP } from "../../constants"
import { createChildStore } from "../common"
import { ProjectModel } from "./ProjectModel"

export const ProjectsStore = createChildStore(
  "ProjectsStore",
  ProjectModel,
  COREJS_APP.projects.orderBy("Title").expand("Children($levels=max)")
)

// Checking typescript support
// ts magic see https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const store = UsersStore.create()
// store.items[0]!.properties.

export interface IProjectsStore extends Instance<typeof ProjectsStore> {}

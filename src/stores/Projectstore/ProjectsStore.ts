import { Instance } from "mobx-state-tree"
import { COREJS_APP } from "../../constants"
import { createChildStore } from "../common"
import { ProjectModel } from "./ProjectModel"
import { ProjectTaskModel } from "./ProjectTaskModel"

export const ProjectsStore = createChildStore({
  storeName: "ProjectsStore",
  ParentModel: ProjectModel,
  Model: ProjectTaskModel,
  collection: COREJS_APP.projects
    .orderBy("Title")
    .expand("Children($levels=max)"),
  isRootStore: true
})

// Checking typescript support
// ts magic see https://github.com/mobxjs/mobx-state-tree/issues/1029#issuecomment-426332067
// const store = ProjectsStore.create()

export interface IProjectsStore extends Instance<typeof ProjectsStore> {}

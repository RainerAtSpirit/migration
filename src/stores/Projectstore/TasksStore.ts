import * as corejs from "@coras/corejs"
import { Instance } from "mobx-state-tree"
import { COREJS_APP } from "../../constants"
import { createStore } from "../common"
import { Task } from "./TaskModel"

export const TasksStore = createStore(
  "TasksStore",
  Task,
  COREJS_APP.projects.getById("guid placeholder").items
)

export interface ITasksStore extends Instance<typeof TasksStore> {}

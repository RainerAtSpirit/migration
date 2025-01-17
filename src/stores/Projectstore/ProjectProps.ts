import { Instance, types } from "mobx-state-tree"
import { TNullOrOptionalString } from "../types"

export const ProjectProps = types.model("ProjectProps", {
  Id: TNullOrOptionalString,
  Title: TNullOrOptionalString,
  CostKPIR_1508195501183: TNullOrOptionalString,
  PerformanceKPIR_1508195501183: TNullOrOptionalString,
  ScheduleKPIR_1508195501183: TNullOrOptionalString,
  ProjectPriorityR_1508195501183: TNullOrOptionalString,
  StatusR_1508195501183: TNullOrOptionalString
})

export interface IProjectProps extends Instance<typeof ProjectProps> {}

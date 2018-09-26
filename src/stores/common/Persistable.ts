import { getSnapshot, Instance, isStateTreeNode, types } from "mobx-state-tree"
import { TOptionalId } from "../types"

export const Persistable = types
  .model("Persistable", {
    uid: TOptionalId,
    Id: types.optional(types.string, "")
  })
  .views(self => ({
    get isNew() {
      return self.Id === ""
    }
  }))
  .actions(self => ({
    // implement in compose
    save() {
      // noinspection TsLint
    }
  }))
  .actions(self => ({
    afterCreate() {
      if (self.isNew) {
        self.save()
      }
    }
  }))
  // Set existing Id to uid
  .preProcessSnapshot(snapshot => {
    if (typeof snapshot === "undefined") {
      return
    }

    if ("Id" in snapshot && snapshot.Id) {
      snapshot.uid = snapshot.Id
    }
    // https://github.com/mobxjs/mobx-state-tree/issues/616
    // noinspection TsLint
    return Object.assign(
      {},
      isStateTreeNode(snapshot) ? getSnapshot(snapshot) : snapshot
    )
  })

export interface IPersistable extends Instance<typeof Persistable> {}

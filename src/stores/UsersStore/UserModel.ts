import { IModelType, Instance, types } from "mobx-state-tree"

export const User = types.model("User", {
  Id: types.optional(types.string, ""),
  DisplayName: types.optional(types.string, ""),
  Email: types.optional(types.string, ""),
  ProfileImageUrl: types.maybe(types.string),
  UserName: types.optional(types.string, "")
})

export interface ICurrentUser extends Instance<typeof User> {}

import { IModelType, Instance, types } from "mobx-state-tree"

export const CurrentUser = types.model("CurrentUser", {
  Id: types.optional(types.string, ""),
  DisplayName: types.optional(types.string, ""),
  Email: types.optional(types.string, ""),
  ProfileImageUrl: types.maybe(types.string),
  UserName: types.optional(types.string, "")
})

export interface ICurrentUser extends Instance<typeof CurrentUser> {}

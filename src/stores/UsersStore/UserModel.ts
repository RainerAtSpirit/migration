import { IModelType, Instance, types } from "mobx-state-tree"

// Todo: refactor in BaseUser
export const User = types.model("User", {
  Id: types.optional(types.string, ""),
  DisplayName: types.optional(types.string, ""),
  Email: types.optional(types.string, ""),
  ProfileImageUrl: types.maybe(types.maybeNull(types.string)),
  UserName: types.optional(types.string, "")
})

export interface IUser extends Instance<typeof User> {}

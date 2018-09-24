import { IModelType, Instance, types } from "mobx-state-tree"

export const CurrentUser = types
  .model("CurrentUser", {
    Id: types.optional(types.string, ""),
    DisplayName: types.optional(types.string, ""),
    Email: types.optional(types.string, ""),
    ProfileImageUrl: types.maybe(types.maybeNull(types.string)),
    Type: types.optional(types.string, ""),
    UserName: types.optional(types.string, ""),
    SiteAdmin: types.optional(types.boolean, false),
    CorasDailyEmails: types.optional(types.boolean, false)
  })
  .views(self => ({
    get isAdmin() {
      return self.Type === "TenantAdmin"
    },
    get isDisplayNameEmpty() {
      return self.DisplayName === ""
    },
    get isEmailEmpty() {
      return self.Email === ""
    },
    get isImageAvailable() {
      return self.ProfileImageUrl !== ""
    }
  }))
  .actions(self => ({
    setDisplayName(name: string) {
      self.DisplayName = name
    },
    setEmail(email: string) {
      self.Email = email
    }
  }))

export interface ICurrentUser extends Instance<typeof CurrentUser> {}

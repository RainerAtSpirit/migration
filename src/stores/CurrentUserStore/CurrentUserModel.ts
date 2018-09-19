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
    }
  }))

export interface ICurrentUser extends Instance<typeof CurrentUser> {}

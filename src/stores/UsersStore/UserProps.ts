import { Instance, types } from "mobx-state-tree"
import { TNullOrOptionalString } from "../types"

export const UserProps = types.model("UserProps", {
  Id: TNullOrOptionalString,
  DisplayName: TNullOrOptionalString,
  Email: TNullOrOptionalString,
  UserName: TNullOrOptionalString,
  ProfileImageUrl: TNullOrOptionalString,
  Type: TNullOrOptionalString,
  SiteAdmin: types.optional(types.boolean, false)
})

export interface IUserProps extends Instance<typeof UserProps> {}

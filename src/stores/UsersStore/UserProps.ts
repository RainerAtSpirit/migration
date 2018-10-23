import { Instance, types } from "mobx-state-tree"
import { TNullOrOptionalString } from "../types"

export const UserProps = types
  .model("UserProps", {
    Id: TNullOrOptionalString,
    DisplayName: TNullOrOptionalString,
    Email: TNullOrOptionalString,
    UserName: TNullOrOptionalString,
    ProfileImageUrl: TNullOrOptionalString,
    Type: TNullOrOptionalString,
    SiteAdmin: types.optional(types.boolean, false)
  })
  .views((self: any) => ({
    // todo: consider generic payload overwrites. this feels like a code smell
    // this workaround was introduced because the the server expects a Name property otherwise DisplayName will be empty.
    get payload() {
      return { ...self.toJSON(), Name: self.DisplayName }
    },
    get isAdmin() {
      return self.Type === "TenantAdmin"
    }
  }))

export interface IUserProps extends Instance<typeof UserProps> {}

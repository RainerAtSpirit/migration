import { Instance, types } from "mobx-state-tree"
import { TNullOrOptionalString } from "../types"

export const UserProps = types
  .model("UserProps", {
    Id: TNullOrOptionalString,
    DisplayName: TNullOrOptionalString,
    Email: TNullOrOptionalString,
    UserName: TNullOrOptionalString,
    ProfileImageUrl: TNullOrOptionalString
  })
  // todo: consider generic payload overwrites. this feels like a code smell
  // this workaround was introduced because the the server expects a Name property otherwise DisplayName will be empty.
  .views((self: any) => ({
    get payload() {
      return { ...self.toJSON(), Name: self.DisplayName }
    }
  }))

export interface IUserProps extends Instance<typeof UserProps> {}

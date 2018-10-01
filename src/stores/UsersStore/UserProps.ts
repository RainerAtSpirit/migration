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
  // todo: consider payload handling
  .views((self: any) => ({
    get payload() {
      // Ensure that we persist "Name" to server as well
      return { ...self, Name: self.DisplayName }
    }
  }))

export interface IUserProps extends Instance<typeof UserProps> {}

import { getSnapshot, Instance, types } from "mobx-state-tree"
import { IUser } from "./UserModel"
import { TNullOrOptionalString } from "../types"

export const UserProps = types
  .model("UserProps", {
    DisplayName: TNullOrOptionalString,
    Email: TNullOrOptionalString,
    UserName: TNullOrOptionalString,
    ProfileImageUrl: TNullOrOptionalString
  })
  .views((self: IUser) => ({
    get isValid() {
      return (
        self.DisplayName !== "" && self.Email !== "" && self.UserName !== ""
      )
    },
    get payload() {
      const payload: any = {}
      Object.keys(getSnapshot(UserProps.create())).forEach(
        k => (payload[k] = self[k])
      )
      if ("isNew" in self && !self.isNew) {
        payload.Id = self.Id
      }
      // Ensure that we perist "Name" to server as well
      payload.Name = self.DisplayName
      return payload
    }
  }))

export interface IUserProps extends Instance<typeof UserProps> {}

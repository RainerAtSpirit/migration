import { getSnapshot, Instance, types } from "mobx-state-tree"
import { TNullOrOptionalString } from "../types"
import { IUser } from "./UserModel"

export const UserProps = types
  .model("UserProps", {
    DisplayName: TNullOrOptionalString,
    Email: TNullOrOptionalString,
    UserName: TNullOrOptionalString,
    ProfileImageUrl: TNullOrOptionalString
  })
  .views((self: IUser) => ({
    get payload() {
      const payload: any = {}
      Object.keys(getSnapshot(UserProps.create())).forEach(
        k => (payload[k] = self[k])
      )
      if ("isNew" in self && !self.isNew) {
        payload.Id = self.Id
      }
      // Ensure that we persist "Name" to server as well
      payload.Name = self.DisplayName
      return payload
    }
  }))

export interface IUserProps extends Instance<typeof UserProps> {}

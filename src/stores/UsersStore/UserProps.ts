import { getSnapshot, Instance, types } from "mobx-state-tree"
import { IUser } from "./UserModel"

export const UserProps = types
  .model("UserProps", {
    DisplayName: types.optional(types.string, ""),
    Email: types.optional(types.string, ""),
    ProfileImageUrl: types.maybeNull(types.optional(types.string, "")),
    UserName: types.optional(types.string, "")
  })
  .views((self: IUser) => ({
    get payload() {
      const payload: any = {}
      Object.keys(getSnapshot(UserProps.create())).forEach(
        k => (payload[k] = self[k])
      )
      if (!self.isNew) {
        payload.Id = self.Id
      }
      return payload
    }
  }))

export interface IUserProps extends Instance<typeof UserProps> {}

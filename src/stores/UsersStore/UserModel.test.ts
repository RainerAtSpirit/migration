import { destroy, cast } from "mobx-state-tree"
import { IUser, User } from "./UserModel"

let modelToTest: IUser | null

beforeEach(() => {
  if (modelToTest) {
    destroy(modelToTest)
  }
})

test("Create without Id", () => {
  modelToTest = User.create()
  expect(modelToTest.isNew).toBe(true)
  expect(modelToTest.payload).toMatchSnapshot()
})

test("Create with Id", () => {
  modelToTest = User.create({ Id: "da4535f3-d582-495b-9b34-557fc5829584" })
  expect(modelToTest.isNew).toBe(false)

  expect(modelToTest.payload).toMatchSnapshot()
})

test("Persist invalid model should reject", () => {
  modelToTest = User.create()
  expect.assertions(1)
  return modelToTest
    .asyncPersist()
    .catch(e => expect(e).toMatch("Precondition failed"))
})

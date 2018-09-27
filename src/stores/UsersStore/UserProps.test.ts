import { destroy } from "mobx-state-tree"
import { IUserProps, UserProps } from "./UserProps"

let modelToTest: IUserProps | null

beforeEach(() => {
  if (modelToTest) {
    destroy(modelToTest)
  }
})

test("Create without props", () => {
  modelToTest = UserProps.create()
  expect(modelToTest.isValid).toBe(false)
  expect(modelToTest.payload).toMatchSnapshot()
})

test("Create with partial props", () => {
  modelToTest = UserProps.create({ DisplayName: "micky" })
  expect(modelToTest.isValid).toBe(false)
  expect(modelToTest.payload).toMatchSnapshot()
})

test("Create with all mandatory props", () => {
  modelToTest = UserProps.create({
    DisplayName: "micky",
    Email: "m@disney.net",
    UserName: "m@dev"
  })
  expect(modelToTest.isValid).toBe(true)
  expect(modelToTest.payload).toMatchSnapshot()
})

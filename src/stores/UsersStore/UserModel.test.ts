import { destroy } from "mobx-state-tree"
import { IUser, User } from "./UserModel"

let modelToTest: IUser | null

beforeEach(() => {
  if (modelToTest) {
    destroy(modelToTest)
  }
})

test("Create Model without arguments", () => {
  modelToTest = User.create()
  expect(modelToTest.isNew).toBe(true)
  expect(modelToTest.payload).toMatchSnapshot()
})

test("Create model with Id property", () => {
  modelToTest = User.create({
    properties: { Id: "da4535f3-d582-495b-9b34-557fc5829584" }
  })
  expect(modelToTest.isNew).toBe(false)
  expect(modelToTest.payload).toMatchSnapshot()
})

// todo: how to test flow, yields and promise.reject
// test("Persist invalid model should reject", () => {
//   modelToTest = User.create()
//   expect.assertions(1)
//   return (
//     modelToTest
//       .asyncPersist()
//       .catch(e => expect(e).toMatch("Precondition failed"))
//   )
// })

describe("Validator", () => {
  test("Create with empty DisplayName", () => {
    modelToTest = User.create({ properties: { DisplayName: "" } })
    expect(modelToTest.isValid).toBe(false)
    expect(modelToTest.validationResult).toMatchSnapshot()
  })

  test("Create with too short DisplayName", () => {
    modelToTest = User.create({
      properties: { DisplayName: "t" }
    })
    expect(modelToTest.isValid).toBe(false)
    expect(modelToTest.validationResult).toMatchSnapshot()
  })

  test("Create without too long  DisplayName", () => {
    modelToTest = User.create({
      properties: { DisplayName: "a".repeat(255) }
    })
    expect(modelToTest.isValid).toBe(false)
    expect(modelToTest.validationResult).toMatchSnapshot()
  })

  test("Create with valid Email", () => {
    modelToTest = User.create({
      properties: {
        Email: "test@test.de"
      }
    })
    expect(modelToTest.validationResult).toMatchSnapshot()
  })

  test("Create with invalid Email", () => {
    modelToTest = User.create({
      properties: {
        Email: "test@test."
      }
    })
    expect(modelToTest.isValid).toBe(false)
  })

  test("Create with all valid props", () => {
    modelToTest = User.create({
      properties: {
        Id: "da4535f3-d582-495b-9b34-557fc5829584",
        DisplayName: "min2",
        Email: "test@test.de",
        UserName: "min2"
      }
    })
    expect(modelToTest.isValid).toBe(true)
    expect(modelToTest.validationResult).toMatchSnapshot()
  })
})

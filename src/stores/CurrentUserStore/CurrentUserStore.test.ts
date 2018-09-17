import { destroy } from "mobx-state-tree"
import { CurrentUserStore, ICurrentUserStore } from "./CurrentUserStore"

let storeToTest: ICurrentUserStore | null

beforeEach(() => {
  if (storeToTest) {
    destroy(storeToTest)
  }
})

test("CurrentUserStore created", () => {
  storeToTest = CurrentUserStore.create()
  expect(storeToTest.state).toBe("idle")
  expect(storeToTest.isIdle).toBeTruthy()
})

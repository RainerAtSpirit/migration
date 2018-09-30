import { getSnapshot, Instance, isStateTreeNode, types } from "mobx-state-tree"

export function createValidatable(validator) {
  const Validatable = types
    .model("Validatable", {})
    .volatile(self => {
      return {
        validator
      }
    })
    .views(self => ({
      get validationResult() {
        const result = {}
        Object.keys(self.validator).forEach(
          k => (result[k] = self.validator[k](self[k]))
        )

        return result
      }
    }))
    .views(self => ({
      get isValid() {
        return Object.values(self.validationResult).every(x => x === null)
      }
    }))

  return Validatable
}

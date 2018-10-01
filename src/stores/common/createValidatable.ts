import { types } from "mobx-state-tree"

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
        const target = "properties" in self ? (self as any).properties : self

        Object.keys(self.validator).forEach(
          k => (result[k] = self.validator[k](target[k]))
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

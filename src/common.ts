import { forEach, isArray, isPlainObject } from "lodash-es"

export function randomUuid(prefix?: string) {
  let pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
  if (prefix) {
    pattern = prefix + pattern.substring(prefix.length)
  }
  // tslint:disable-next-line:only-arrow-functions
  return pattern.replace(/[xy]/g, function(c) {
    // tslint:disable-next-line
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function recursiveAddODataAnnotation(parent: object) {
  parent["@odata.type"] = "#CorasCloud.Entities.JsonField"

  forEach(parent, (value, key) => {
    if (isArray(value)) {
      parent[`${key}@odata.type`] = "#Collection(CorasCloud.Entities.JsonField)"
      // @ts-ignore
      value.forEach(item => recursiveAddODataAnnotation(item))
    }
    if (isPlainObject(value)) {
      recursiveAddODataAnnotation(value)
    }
  })

  return parent
}

export function recursiveRemoveODataAnnotation(parent: object) {
  delete parent["@odata.type"]

  forEach(parent, (value, key) => {
    if (isArray(value)) {
      delete parent[`${key}@odata.type`]
      // @ts-ignore
      value.forEach(item => recursiveRemoveODataAnnotation(item))
    }
    if (isPlainObject(value)) {
      recursiveRemoveODataAnnotation(value)
    }
  })

  return parent
}

export interface IGetPositionOptions {
  after?: string
  before?: string
}

export function getPosition(config?: IGetPositionOptions) {
  if (!config) {
    return randomUuid()
  }

  const candidate = randomUuid()

  return compareGuids(config, candidate)

  // tslint:disable-next-line:no-shadowed-variable
  function compareGuids(config: IGetPositionOptions, candidate) {
    let unsorted
    let prefix
    if (config.after && config.before) {
      prefix = sharedStart([config.after, config.before])
      unsorted = [config.after, candidate, config.before]
      if (unsorted.slice().sort()[1] === candidate) {
        return candidate
      } else {
        return compareGuids(config, randomUuid(prefix))
      }
    }

    if (config.after) {
      unsorted = [config.after, candidate]
      if (unsorted.slice().sort()[1] === candidate) {
        return candidate
      } else {
        return compareGuids(config, randomUuid())
      }
    }

    if (config.before) {
      unsorted = [config.before, candidate]
      if (unsorted.slice().sort()[0] === candidate) {
        return candidate
      } else {
        return compareGuids(config, randomUuid(prefix))
      }
    }
  }

  function sharedStart(array) {
    const A = array.concat().sort()
    const a1 = A[0]
    const a2 = A[A.length - 1]
    const L = a1.length
    let i = 0
    while (i < L && a1.charAt(i) === a2.charAt(i)) {
      i++
    }
    return a1.substring(0, i)
  }
}

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
})

export function enumToArray<Enum>(subject) {
  return Object.keys(subject).filter(key => !isNaN(Number(subject[key])))
}

import { escapeRegExp, filter, orderBy } from "lodash-es"
import { Instance, types } from "mobx-state-tree"
import { LoadingStates, TLoadingStates, TNullOrOptionalString } from "../types"

export interface IOrderByExpression {
  name: string
  dir: "asc" | "desc"
}

export const OrderAndSearchable = types
  .model("OrderAndSearchable", {
    searchText: TNullOrOptionalString,
    searchableProperties: types.array(types.string),
    orderBy: types.array(types.frozen<IOrderByExpression>())
  })
  .views((self: any) => ({
    get searchResult() {
      let result = self.items
      const propsToSearch = self.searchableProperties
      const searchText = self.searchText
      const regExp = new RegExp(`(${escapeRegExp(searchText)})`, "i")

      if (searchText && propsToSearch.length > 0) {
        result = filter(self.items, item => {
          let count = 0
          propsToSearch.forEach(prop => {
            count = regExp.test(item.properties[prop]) ? count + 1 : count
          })

          return count > 0
        })
      }

      return self.orderBy.length > 0
        ? orderBy(
            result,
            self.orderBy.map(o => `properties.${o.name}`),
            self.orderBy.map(o => o.dir)
          )
        : result
    }
  }))
  .actions(self => ({
    setSearchText(search: string) {
      self.searchText = search
    }
  }))

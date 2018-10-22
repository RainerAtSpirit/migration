import { escapeRegExp, orderBy } from "lodash-es"
import { Instance, types } from "mobx-state-tree"
import { LoadingStates, TLoadingStates, TNullOrOptionalString } from "../types"

export interface IOrderByExpression {
  name: string
  dir: "asc" | "desc"
}

export const OrderAndSearchable = types
  .model("OrderAndSearchable", {
    searchText: TNullOrOptionalString,
    searchableProperty: TNullOrOptionalString,
    orderBy: types.array(types.frozen<IOrderByExpression>())
  })
  .views((self: any) => ({
    get searchResult() {
      let result = self.items
      const propToSearch = self.searchableProperty
      const searchText = self.searchText
      const regExp = new RegExp(`(${escapeRegExp(searchText)})`, "i")

      if (searchText && propToSearch) {
        result = self.items.filter(item => {
          return (
            item.properties[propToSearch] &&
            regExp.test(item.properties[propToSearch])
          )
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
    },

    setSearchableProperty(props: string) {
      self.searchableProperty = props
    }
  }))

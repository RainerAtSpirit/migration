import { escapeRegExp } from "lodash-es"
import { Instance, types } from "mobx-state-tree"
import { LoadingStates, TLoadingStates, TNullOrOptionalString } from "../types"

export const Searchable = types
  .model("Searchable", {
    searchText: TNullOrOptionalString,
    searchableProperty: TNullOrOptionalString
  })

  .views((self: any) => ({
    get searchResult() {
      const result = self.items
      const propToSearch = self.searchableProperty
      const searchText = self.searchText
      const regExp = new RegExp(`(${escapeRegExp(searchText)})`, "i")

      if (searchText && propToSearch) {
        return self.items.filter(item => {
          return (
            item.properties[propToSearch] &&
            regExp.test(item.properties[propToSearch])
          )
        })
      }

      return self.items
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

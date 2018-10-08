import { action, computed, observable } from "mobx"
let id = 0
export class ItemState {
  @observable
  public isCollapsed: boolean
  public id: number

  constructor(isCollapsed: boolean = false) {
    this.id = id += 1
    this.isCollapsed = isCollapsed
  }
  @computed
  public get icon() {
    return this.isCollapsed ? "chevron right" : "chevron down"
  }

  @action
  public toggleCollapsed = e => {
    e.preventDefault()
    e.stopPropagation()
    this.isCollapsed = !this.isCollapsed
  }
}

import { inject, observer } from "mobx-react"
import * as React from "react"
import { Button, Dropdown, Icon, Menu } from "semantic-ui-react"
import { style } from "typestyle"
import { CurrentUserMenu } from "../components"
import { IRootStore } from "../stores/RootStore"
import { Sidebar1 } from "./index"
import Main from "./Main"

const bg = color => ({ backgroundColor: color })
const cssCurrentUserStyle = style({
  color: "white"
})
export interface ILayoutProps {
  store?: IRootStore
}

// TODO move hardcoded CSS class names into configuration stuff
export const Layout = inject("store")(
  observer(({ store }: ILayoutProps) => {
    return (
      <>
        <header className="cc__header">
          <div className="cc__header__leftBlock">
            <div className="logo">
              <img src="img/CorasReportsLogo.png" />
            </div>
          </div>
          <div className="cc_header_user cc__header__rightBlock">
            <CurrentUserMenu userStore={store.currentUserStore} />
          </div>
        </header>
        <Main cssClass="cc__main" />
        <Sidebar1 cssClass="cc__left1 greyColumn" />
      </>
    )
  })
)

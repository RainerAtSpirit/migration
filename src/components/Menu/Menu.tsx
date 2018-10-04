import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import {
  SemanticDIRECTIONALTRANSITIONS,
  TransitionablePortal
} from "semantic-ui-react"
import { HELP_URL } from "../../constants"
// import {openPortfolioOverlay, openProcessMapOverlay, openProjectOverlay} from './../../../helpers/common'
// import modalDefinitions from './../../../modalDefinitions'
// import {IAppsStore, IMenuItemStore, IStringAnyMap} from './../../index'
import { IMenuItemStore } from "../../stores/MenuItem"
import "./menu.less"
import { MenuItemsList } from "./MenuItemsList"

const SUCCESS_STATUS = "ok"

interface IMenuProps {
  store: IMenuItemStore
  app: any
  router: any
}

interface IMenuState {
  menuOpen: boolean
}

// Todo: Refactor as SFC
@inject("routerStore")
@observer
export class Menu extends React.Component<IMenuProps, IMenuState> {
  public state = {
    menuOpen: false
  }
  private animationProps = {
    animation: "slide right" as SemanticDIRECTIONALTRANSITIONS,
    duration: 200
  }

  constructor(props: IMenuProps) {
    super(props)

    this.itemClickHandler = this.itemClickHandler.bind(this)
    this.navigateToHelp = this.navigateToHelp.bind(this)
    this.navigate = this.navigate.bind(this)
    this.addPortfolioHandler = this.addPortfolioHandler.bind(this)
    this.addProjectHandler = this.addProjectHandler.bind(this)
    this.addProcessMapHandler = this.addProcessMapHandler.bind(this)
  }

  // todo: new modal handling if any
  // tslint:disable-next-line
  public closeAllModals() {}

  public itemClickHandler(route: string, params = {}) {
    this.navigate(route, params)
    this.props.store.close()
  }

  public navigate(url: string, params = {}) {
    this.closeAllModals()
    this.props.router.navigate(url, params)
  }

  public navigateToHelp() {
    window.open(HELP_URL, "_blank")
  }

  public addPortfolioHandler(e) {
    // openPortfolioOverlay()
    this.props.store.close()
    e.stopPropagation()
  }

  public addProjectHandler(e) {
    const { app } = this.props

    // const callback = (success, data) => {
    //     if (success === SUCCESS_STATUS) {
    //         const projectKPIStatus = app.projectKPIStatus as IStringAnyMap
    //         const taskStatus = app.taskStatus as IStringAnyMap
    //         const config = {
    //             parent: null,
    //             taskConfig: {
    //                 isTaskUpdating: true,
    //                 title: data.input,
    //                 assignedTo: [app.currentUser.UserObjWithAdmin],
    //                 complete: taskStatus.NotStarted.percent,
    //                 projectColor: '#c3c3c3'
    //             },
    //             projectConfig: {
    //                 title: data.input,
    //                 description: data.textarea,
    //                 priority: (app.projectPriority as IStringAnyMap).Normal.title,
    //                 reports: (app.defaultReports as IStringAnyMap).ProjectTeam.value,
    //                 costKPI: projectKPIStatus.Green.title,
    //                 scheduleKPI: projectKPIStatus.Green.title,
    //                 performanceKPI: projectKPIStatus.Green.title,
    //                 storedTeamMemberObj: JSON.stringify([app.currentUser.TeamObj]),
    //                 status: taskStatus.NotStarted.title
    //             },
    //             addProjectCallback: project => {
    //                 this.navigate('/project/' + project.id())
    //             }
    //         }
    //         app.projects.addProject(config)
    //     }
    // }
    //
    // openProjectOverlay(callback)

    this.props.store.close()
    e.stopPropagation()
  }

  public addProcessMapHandler(e) {
    const { app } = this.props
    const addCallback = (status, data) => {
      if (status === SUCCESS_STATUS) {
        app.processMaps.addProcessMap({
          processMapProps: {
            title: data.input,
            description: data.textarea
          },
          callback: map => {
            this.navigate("/mapgallery/" + map.id())
            this.navigate("/mapgallery/")
          }
        })
      }
    }

    // openProcessMapOverlay(addCallback)

    this.props.store.close()
    e.stopPropagation()
  }

  public render() {
    const { app, store } = this.props
    const isVerizonOCR = false // app.currentUser.isVerizonOCR
    return (
      <div className="cm-menu">
        <div className="menu-icon" onClick={this.props.store.open}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <TransitionablePortal
          onClose={this.props.store.close}
          open={this.props.store.isVisible}
          transition={this.animationProps}
        >
          <div className="cm-menu menu-container">
            <ul className="menu-items-block">
              <li onClick={this.itemClickHandler.bind(this, "home", {})}>
                <i className="material-icons">home</i>
                <a className="level-one" title="Home">
                  Home
                </a>
              </li>
              <li>
                <i className="material-icons">bookmark</i>
                <a className="level-one" title="My Bookmarks">
                  My Bookmarks
                </a>
                <MenuItemsList
                  store={store}
                  viewName="bookmarkItems"
                  itemClickHandler={this.itemClickHandler}
                />
              </li>
              <li onClick={this.itemClickHandler.bind(this, "portfolios", {})}>
                <i className="material-icons">group_work</i>
                <a className="level-one" title="Portfolios">
                  Portfolios
                </a>
                <i
                  className="material-icons add-item"
                  title="add portfolio"
                  onClick={this.addPortfolioHandler}
                >
                  add
                </i>
                <MenuItemsList
                  store={store}
                  viewName="portfolioItems"
                  itemClickHandler={this.itemClickHandler}
                />
              </li>
              <li onClick={this.itemClickHandler.bind(this, "projects", {})}>
                <i className="material-icons">view_comfy</i>
                <a className="level-one" title="Groups">
                  Groups
                </a>
                <i
                  className="material-icons add-item"
                  title="add group"
                  onClick={this.addProjectHandler}
                >
                  add
                </i>
                <MenuItemsList
                  store={store}
                  viewName="groupItems"
                  itemClickHandler={this.itemClickHandler}
                />
              </li>
              <li onClick={this.itemClickHandler.bind(this, "mapgallery", {})}>
                <i className="material-icons last">widgets</i>
                <a className="level-one" title="Map Gallery">
                  Map Gallery
                </a>
                <i
                  className="material-icons add-item"
                  title="add map"
                  onClick={this.addProcessMapHandler}
                >
                  add
                </i>
              </li>
              {isVerizonOCR && (
                <li onClick={this.itemClickHandler.bind(this, "choreography")}>
                  <i className="material-icons">group_work</i>
                  <a className="level-one" title="Choreography">
                    Choreography
                  </a>
                </li>
              )}
            </ul>
            <div className="menu-footer" onClick={this.navigateToHelp}>
              <div className="menu-option">
                <i className="material-icons footer-icon">
                  play_circle_outline
                </i>
                <a className="footer-text">
                  <span>Video tutorials</span>
                </a>
              </div>
            </div>
          </div>
        </TransitionablePortal>
      </div>
    )
  }
}

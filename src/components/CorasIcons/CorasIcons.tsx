import { SvgIconProps } from "@material-ui/core/SvgIcon/"
// Prefer direct imports to speed up hot module reloads
import Add from "@material-ui/icons/Add"
import Bookmark from "@material-ui/icons/Bookmark"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
import Delete from "@material-ui/icons/Delete"
import Email from "@material-ui/icons/Email"
import GroupWork from "@material-ui/icons/GroupWork"
import Home from "@material-ui/icons/Home"
import HowToReg from "@material-ui/icons/HowToReg"
import NavigateNext from "@material-ui/icons/NavigateNext"
import Person from "@material-ui/icons/Person"
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline"
import Refresh from "@material-ui/icons/Refresh"
import Settings from "@material-ui/icons/Settings"
import VerifiedUser from "@material-ui/icons/VerifiedUser"
import ViewComfy from "@material-ui/icons/ViewComfy"
import Widgets from "@material-ui/icons/Widgets"
import * as React from "react"

export enum CorasIcons {
  ADD = "Add",
  BOOKMARK = "Bookmark",
  CHECK = "Check",
  CLEAR = "Clear",
  DELETE = "Delete",
  EMAIL = "Email",
  GROUP_WORK = "GroupWork",
  HOME = "Home",
  HOW_TO_REG = "HowToReg",
  NAVIGATE_NEXT = "NavigateNext",
  PERSON = "Person",
  PLAY_CIRCLE_OUTLINE = "PlayCircleOutline",
  REFRESH = "Refresh",
  SETTINGS = "Settings",
  VERIFIED_USER = "VerifiedUser",
  VIEW_COMFY = "ViewComfy",
  WIDGETS = "Widgets"
}

export type TCorasIconsMap = { [key in CorasIcons]: any }

const CorasIconsMap: TCorasIconsMap = {
  Add,
  Bookmark,
  Check,
  Clear,
  Delete,
  Email,
  GroupWork,
  Home,
  HowToReg,
  NavigateNext,
  Person,
  PlayCircleOutline,
  Refresh,
  Settings,
  VerifiedUser,
  ViewComfy,
  Widgets
}

interface ICorasIcons extends SvgIconProps {
  name: keyof typeof CorasIcons
}

export const CorasIcon: React.SFC<ICorasIcons> = ({
  name,
  ...props
}: ICorasIcons) => {
  const defaults: SvgIconProps = {
    className: "coras-icon"
  }

  const Component = CorasIconsMap[CorasIcons[name]]

  return <Component {...defaults} {...props} />
}

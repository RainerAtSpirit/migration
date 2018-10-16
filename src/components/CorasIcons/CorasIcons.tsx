import { SvgIconProps } from "@material-ui/core/SvgIcon/"
// Prefer direct imports to speed up hot module reloads
import Bookmark from "@material-ui/icons/Bookmark"
import Delete from "@material-ui/icons/Delete"
import Email from "@material-ui/icons/Email"
import GroupWork from "@material-ui/icons/GroupWork"
import Home from "@material-ui/icons/Home"
import VerifiedUser from "@material-ui/icons/VerifiedUser"
import ViewComfy from "@material-ui/icons/ViewComfy"
import Widgets from "@material-ui/icons/Widgets"

import * as React from "react"
import "./corasicon.less"

export enum CorasIcons {
  BOOKMARK = "Bookmark",
  DELETE = "Delete",
  EMAIL = "Email",
  GROUP_WORK = "GroupWork",
  HOME = "Home",
  VERIFIED_USER = "VerfiedUser",
  VIEW_COMFY = "ViewConfy",
  WIDGETS = "Widgets"
}

export type TCorasIconsMap = { [key in CorasIcons]: any }

const CorasIconsMap: TCorasIconsMap = {
  Bookmark: Bookmark,
  Delete: Delete,
  Email: Email,
  GroupWork: GroupWork,
  Home: Home,
  VerfiedUser: VerifiedUser,
  ViewConfy: ViewComfy,
  Widgets: Widgets
}

interface ICorasIcons extends SvgIconProps {
  name: keyof typeof CorasIcons
}

export const CorasIcon: React.SFC<ICorasIcons> = ({
  name,
  ...props
}: ICorasIcons) => {
  const defaults: SvgIconProps = {
    className: "coras-icon",
    nativeColor: "#adadad"
  }

  const Component = CorasIconsMap[name]

  return <Component {...defaults} {...props} />
}

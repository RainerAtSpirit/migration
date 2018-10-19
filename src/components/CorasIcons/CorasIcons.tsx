import * as React from "react"
import { classes } from "typestyle"
import { SvgAdd } from "./components/Add"
import { SvgBookmark } from "./components/Bookmark"
import { SvgCheck } from "./components/Check"
import { SvgClear } from "./components/Clear"
import { SvgDelete } from "./components/Delete"
import { SvgEmail } from "./components/Email"
import { SvgGroupWork } from "./components/GroupWork"
import { SvgHome } from "./components/Home"
import { SvgHowToReg } from "./components/HowToReg"
import { SvgNavigateNext } from "./components/NavigateNext"
import { SvgPerson } from "./components/Person"
import { SvgPlayCircleOutline } from "./components/PlayCircleOutline"
import { SvgRefresh } from "./components/Refresh"
import { SvgSettings } from "./components/Settings"
import { SvgVerifiedUser } from "./components/VerifiedUser"
import { SvgViewComfy } from "./components/ViewComfy"
import { SvgWidgets } from "./components/Widgets"
import "./coras-icons.less"

export enum CorasIcons {
  ADD = "SvgAdd",
  BOOKMARK = "SvgBookmark",
  CHECK = "SvgCheck",
  CLEAR = "SvgClear",
  DELETE = "SvgDelete",
  EMAIL = "SvgEmail",
  GROUP_WORK = "SvgGroupWork",
  HOME = "SvgHome",
  HOW_TO_REG = "SvgHowToReg",
  NAVIGATE_NEXT = "SvgNavigateNext",
  PERSON = "SvgPerson",
  PLAY_CIRCLE_OUTLINE = "SvgPlayCircleOutline",
  REFRESH = "SvgRefresh",
  SETTINGS = "SvgSettings",
  VERIFIED_USER = "SvgVerifiedUser",
  VIEW_COMFY = "SvgViewComfy",
  WIDGETS = "SvgWidgets"
}

export type TCorasIconsMap = { [key in CorasIcons]: any }

const CorasIconsMap: TCorasIconsMap = {
  SvgAdd,
  SvgBookmark,
  SvgCheck,
  SvgClear,
  SvgDelete,
  SvgEmail,
  SvgGroupWork,
  SvgHome,
  SvgHowToReg,
  SvgNavigateNext,
  SvgPerson,
  SvgPlayCircleOutline,
  SvgRefresh,
  SvgSettings,
  SvgVerifiedUser,
  SvgViewComfy,
  SvgWidgets
}

interface ICorasIcons {
  name: keyof typeof CorasIcons
  title?: string
  onClick?: (e) => void
  className?: string
}

export const CorasIcon: React.SFC<ICorasIcons> = ({
  className,
  name,
  title,
  ...props
}: ICorasIcons) => {
  const defaults = {
    focusable: false,
    "aria-hidden": !!title,
    role: title ? "img" : "presentation",
    className: classes("coras-icon", className),
    title
  }

  const Component = CorasIconsMap[CorasIcons[name]]

  return <Component {...defaults} {...props} />
}

CorasIcon.displayName = "CorasIcon"

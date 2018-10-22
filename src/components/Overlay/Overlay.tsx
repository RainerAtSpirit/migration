import { observer } from "mobx-react"
import * as React from "react"
import {
  SemanticDIRECTIONALTRANSITIONS,
  TransitionablePortal
} from "semantic-ui-react"
import { IOverlayStore } from "../../stores/OverlayStore"
import {
  AccountSettingsOverlayPanel,
  CmTaskCommentsOverlayPanel,
  UserSettingsOverlayPanel
} from "./panel/"

import { PanelTypes } from "../../stores/types"
import "./overlay.less"

export type TPanelComponentMap = { [key in PanelTypes]: any }

export interface IOverlayProps {
  overlayStore: IOverlayStore
}

export const Overlay: React.SFC<IOverlayProps> = observer(
  ({ overlayStore, ...props }: IOverlayProps) => {
    const animationProps = {
      animation: "slide left" as SemanticDIRECTIONALTRANSITIONS,
      duration: 200
    }

    const Panel: TPanelComponentMap = {
      account: <AccountSettingsOverlayPanel {...overlayStore} />,
      task: <CmTaskCommentsOverlayPanel {...overlayStore} />,
      user: <UserSettingsOverlayPanel {...overlayStore} />
    }

    return (
      <TransitionablePortal
        open={overlayStore.isVisible}
        transition={{ ...animationProps }}
        onClose={overlayStore.close}
      >
        <div className="cm-overlay-panel">
          <div className="overlay-content">
            {overlayStore.selectedPanel
              ? Panel[overlayStore.selectedPanel]
              : "No panel selected"}
          </div>
        </div>
      </TransitionablePortal>
    )
  }
)

Overlay.displayName = "Overlay"

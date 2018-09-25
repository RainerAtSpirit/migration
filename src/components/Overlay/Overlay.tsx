import { observer } from "mobx-react"
import * as React from "react"
import {
  SemanticDIRECTIONALTRANSITIONS,
  TransitionablePortal
} from "semantic-ui-react"
import { IOverlayStore } from "../../stores/OverlayStore"
import {
  CmTaskCommentsOverlayPanel,
  CmUserSettingsOverlayPanel
} from "./panel/"

import "./overlay.less"

// todo how to add enum PanelTypes checking?
const Panel = {
  task: <CmTaskCommentsOverlayPanel />,
  user: <CmUserSettingsOverlayPanel />
}

export interface IOverlayProps {
  overlayStore: IOverlayStore
}

export const Overlay: React.SFC<IOverlayProps> = observer(
  ({ overlayStore, ...props }) => {
    const animationProps = {
      animation: "slide left" as SemanticDIRECTIONALTRANSITIONS,
      duration: 200
    }

    return (
      <TransitionablePortal
        open={overlayStore.isVisible}
        transition={{ ...animationProps }}
        onClose={overlayStore.closeOverlay}
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

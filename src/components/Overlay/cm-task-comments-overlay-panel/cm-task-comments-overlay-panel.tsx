import { observer } from "mobx-react"
import * as React from "react"
import "./cm-task-comments-overlay-panel.less"

// tslint:disable-next-line
export interface ICmTaskCommentsOverlayPanel {}

export const CmTaskCommentsOverlayPanel: React.SFC<
  ICmTaskCommentsOverlayPanel
> = observer(({ overlayStore, ...props }) => {
  return (
    <div className="cm-task-comments-overlay-panel">
      <div className="details-header">
        <div className="work-item-letter">
          <div className="first-letter">Z</div>
        </div>
        <div className="group-title">
          <div className="input-container">
            <input type="text" className="content" />
          </div>
          <div className="due-date">
            <span className="detail">
              ( due <span>7/17/2018</span> )
            </span>
          </div>
        </div>
        <div className="group-items-overdue">
          <span>Overdue 69 days</span>
        </div>
      </div>

      <div className="details-main">
        <div className="details-label width-50 padding-alt">
          <span>Refactor this :)</span>
        </div>
      </div>
    </div>
  )
})

CmTaskCommentsOverlayPanel.displayName = "CmTaskCommentsOverlayPanel"

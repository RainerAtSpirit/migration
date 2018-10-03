import { observer } from "mobx-react"
import * as React from "react"
import { Button, ButtonProps, Confirm, Header } from "semantic-ui-react"

const dialogIcon = "exclamation circle"
const defaultHeader = "Delete item?"

export interface IConfirmDeleteConfig {
  onDelete: () => void
  header: string
  content?: string | [string, string]
  trigger?: TriggerType
}

export enum TriggerType {
  IconOnly = "IconOnly",
  IconText = "IconText",
  MapButton = "MapButton"
}

export interface IConfirmDeleteProps extends ButtonProps {
  confirmDeleteConfig: IConfirmDeleteConfig
}

/* tslint:disable:member-ordering*/

@observer
export class ConfirmDeleteButton extends React.Component<IConfirmDeleteProps> {
  public static getMainContent(content: string): string
  public static getMainContent<T>(content: T): string
  public static getMainContent<T>(content: [string, string]): JSX.Element
  public static getMainContent(content) {
    if (typeof content === "string") {
      return content
    }
    if (content === undefined) {
      return ""
    }
    if (Array.isArray(content)) {
      const [topContent, bottomContent] = content
      return (
        <div className="content">
          <div className="top-content">{topContent}</div>
          <div className="bottom-content">{bottomContent}</div>
        </div>
      )
    }
  }

  public props: IConfirmDeleteProps

  public state = { open: false }

  public onClick = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({ open: true })
  }

  public handleDelete = () => {
    this.props.confirmDeleteConfig.onDelete()
    return this.setState({ open: false })
  }

  public handleClose = () => this.setState({ open: false })

  private triggerTypeMap = {
    [TriggerType.IconOnly]: (
      <div className="project-delete" onClick={this.onClick}>
        <i className="material-icons">delete</i>
      </div>
    ),
    [TriggerType.IconText]: (
      <div onClick={this.onClick}>
        <i className="material-icons">delete</i>
        <span>remove</span>
      </div>
    ),
    [TriggerType.MapButton]: (
      <Button onClick={this.onClick} className="cm-confirm-delete-button">
        X
      </Button>
    )
  }

  public render() {
    const trigger = this.defineTrigger(this.props.confirmDeleteConfig.trigger)
    const content = ConfirmDeleteButton.getMainContent(
      this.props.confirmDeleteConfig.content
    )
    return (
      <div className="semantic-ui">
        <Confirm
          className="cm-confirm-delete"
          trigger={trigger}
          open={this.state.open}
          header={
            <Header
              icon={dialogIcon}
              content={this.props.confirmDeleteConfig.header || defaultHeader}
            />
          }
          content={content}
          confirmButton="Delete"
          onCancel={this.handleClose}
          onConfirm={this.handleDelete}
        />
      </div>
    )
  }

  protected defineTrigger(triggerType: TriggerType = TriggerType.MapButton) {
    return this.triggerTypeMap[triggerType]
  }
}

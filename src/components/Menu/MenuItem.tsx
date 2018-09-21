import { observer } from "mobx-react"
import * as React from "react"
import { IMenuItemModel } from "../../stores/MenuItem/MenuItemModel"

interface IMenuItemProps {
  data: IMenuItemModel
  onClick: (link: string) => void
  onDelete: (type: string, id: string) => void
}

export const MenuItem: React.SFC<IMenuItemProps> = observer(
  (props: IMenuItemProps): JSX.Element => {
    const {
      title,
      itemId: id,
      isDeletable,
      bookmarkType,
      isBookmark
    } = props.data
    const type = isBookmark ? bookmarkType : props.data.type
    const link = `/${type}/${id}`
    const clickHandler = e => {
      props.onClick(link)
      e.stopPropagation()
    }
    const deleteHandler = e => {
      props.onDelete(props.data.type, id)
      e.stopPropagation()
    }

    return (
      <li onClick={clickHandler}>
        <i className="material-icons">navigate_next</i>
        {!isDeletable ? (
          <a className="fs-hide" title={title}>
            {title}
          </a>
        ) : (
          <>
            <a className="fs-hide">
              <span className="link-title" title={title}>
                {title}
              </span>
              <span className="link-type">({type})</span>
            </a>
            <i
              className="material-icons remove-bookmark"
              onClick={deleteHandler}
            >
              clear
            </i>
          </>
        )}
      </li>
    )
  }
)

MenuItem.displayName = "MenuItem"

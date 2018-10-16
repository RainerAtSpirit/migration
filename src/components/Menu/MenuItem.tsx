import { observer } from "mobx-react"
import * as React from "react"
import { IMenuItemModel } from "../../stores/MenuItem/MenuItemModel"
import { CorasIcon } from "../CorasIcons/CorasIcons"

interface IMenuItemProps {
  data: IMenuItemModel
  onClick: (link: string, params: object) => void
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
      props.onClick(type, { id })
      e.stopPropagation()
    }
    const deleteHandler = e => {
      props.onDelete(props.data.type, id)
      e.stopPropagation()
    }

    return (
      <li onClick={clickHandler}>
        <CorasIcon name={"NAVIGATE_NEXT"} />
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
            <CorasIcon
              name={"CLEAR"}
              className="remove-bookmark"
              onClick={deleteHandler}
            />
          </>
        )}
      </li>
    )
  }
)

MenuItem.displayName = "MenuItem"

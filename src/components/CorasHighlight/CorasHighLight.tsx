import { escapeRegExp } from "lodash-es"
import * as React from "react"

interface ICorasHighlightProps {
  search: string
  text: string
}

export const CorasHighlight: React.SFC<ICorasHighlightProps> = ({
  search,
  text,
  ...props
}: ICorasHighlightProps) => {
  const rexExp = new RegExp(`(${escapeRegExp(search)})`, "i")
  const parts = String(text).split(rexExp)

  if (search) {
    return (
      <>
        {parts.map(
          (part, index) =>
            rexExp.test(part) ? <mark key={index}>{part}</mark> : part
        )}
      </>
    )
  } else {
    return <>{text}</>
  }
}

CorasHighlight.displayName = "CorasHighlight"

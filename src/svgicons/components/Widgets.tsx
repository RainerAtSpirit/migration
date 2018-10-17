import * as React from "react"

export const SvgWidgets = ({ title, props }) => {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>{title}</title>
      <path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  )
}

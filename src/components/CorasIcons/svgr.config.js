const template = (code, options, state) => `
import * as React from "react"

export const ${state.componentName} = ( { title, ...props } ) => {
  return (
    ${code}
  )
}
`

module.exports = {
  template,
  dimensions: false,
  icon: true,
  ext: "tsx",
  expandProps: "end"
}

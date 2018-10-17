const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)
const [source] = process.argv.slice(2)
;(async () => {
  const list = await readdir(source)
  // fail in svgr index generator if icon name is index in any case
  const names = list
    .filter(file => file.toLowerCase() !== "index.tsx")
    .map(file => path.basename(file, ".tsx"))
  const imports = names.map(
    name => `import { Svg${name} } from './components/${name}'`
  )
  const enums = names.map(
    name =>
      `${name
        .split(/(?=[A-Z])/)
        .join("_")
        .toUpperCase()} = "Svg${name}"`
  )
  const icons = names.map(name => `Svg${name}`)
  const content = `import * as React from "react"
  ${imports.join("\n")}
  import "./coras-icons.less"
  
  export enum CorasIcons {
    ${enums.join(",\n")}
  }
  
  export type TCorasIconsMap = { [key in CorasIcons]: any }
  
  const CorasIconsMap: TCorasIconsMap = {
    ${icons.join(",\n")}
  }
  
  interface ICorasIcons {
    name: keyof typeof CorasIcons,
    title?: string,
    onClick?: (e) => void,
    className?: string
  }
  
  export const CorasIcon: React.SFC<ICorasIcons> = ({
    name,
    title,
    ...props
  }: ICorasIcons) => {
    const defaults = {
     focusable : false,
     "aria-hidden" : !!title,
     role :  title ? "img" : "presentation",
     className: "coras-icon"
    }
  
    const Component = CorasIconsMap[CorasIcons[name]]
  
    return <Component {...defaults} {...props} />
  }

  CorasIcon.displayName = "CorasIcon"
  `
  await writeFile(path.join(source, "../CorasIcons.tsx"), content)
})()

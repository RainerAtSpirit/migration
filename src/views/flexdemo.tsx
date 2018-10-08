import * as csstips from "csstips"
import { rgba } from "csx"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-mobx-router5"
import { Button } from "semantic-ui-react"
import { style } from "typestyle"
import {
  FlexContainer,
  FlexRoot,
  IFlexContainerProps,
  TFlexAxis,
  TFlexType
} from "../layout/index"

const Switchable = observer(({ myState, ...props }) => {
  const red = rgba(255, 0, 0, 1)
  const green = rgba(0, 255, 0, 1)
  const blue = rgba(0, 0, 255, 1)

  return (
    <FlexContainer flexType={TFlexType.FLEX} axis={myState.axis}>
      <FlexContainer className={style({ backgroundColor: red.toString() })}>
        one
      </FlexContainer>
      <FlexContainer className={style({ backgroundColor: blue.toString() })}>
        two
      </FlexContainer>
      <FlexContainer className={style({ backgroundColor: green.toString() })}>
        three
      </FlexContainer>
    </FlexContainer>
  )
})

// During development time it might be useful to use dynamic classes typestyle and even dynamic layouts via
// via FlexRoot and FlexContainer
// local state might be managed by a local observable
export const FlexDemo: React.SFC = inject("store", "routerStore")(
  observer(({ route, store, routerStore, ...props }) => {
    interface IMyState extends IFlexContainerProps {}

    const myState: IMyState = observable({
      axis: TFlexAxis.HORIZONTAL
    })

    const toggleAxis = action(() => {
      myState.axis =
        myState.axis === TFlexAxis.HORIZONTAL
          ? TFlexAxis.VERTICAL
          : TFlexAxis.HORIZONTAL
    })

    return (
      <FlexRoot axis={TFlexAxis.VERTICAL}>
        <FlexContainer
          flexType={TFlexType.CONTENT}
          className={style({ backgroundColor: "lightblue", padding: 10 })}
        >
          <div>
            This is the header content area.{" "}
            <Button primary={true} onClick={toggleAxis}>
              toggle Flex layout
            </Button>
          </div>
        </FlexContainer>
        <Switchable myState={myState} />
        <FlexContainer
          flexType={TFlexType.CONTENT}
          className={style(
            { backgroundColor: "lightblue" },
            csstips.height(50)
          )}
        >
          This is the footer content area
        </FlexContainer>
      </FlexRoot>
    )
  })
)

FlexDemo.displayName = "FlexDemo"

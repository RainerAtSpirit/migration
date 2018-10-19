import { shallow } from "enzyme"
import * as React from "react"
import { CorasIcon } from "./CorasIcons"

let wrapper
let component

beforeEach(() => {
  if (wrapper) {
    wrapper = null
  }
  if (component) {
    component = null
  }
})

describe("CorasIcons", () => {
  test("use without title", () => {
    wrapper = shallow(<CorasIcon name="PERSON" />)
    expect(wrapper.props()["aria-hidden"]).toBe(true)
    expect(wrapper.props().role).toMatch("presentation")
    component = wrapper.dive()
    expect(component).toMatchSnapshot()
  })

  test("use with title", () => {
    wrapper = shallow(<CorasIcon name="PERSON" title="Test" />)
    expect(wrapper.props()["aria-hidden"]).toBe(false)
    expect(wrapper.props().role).toMatch("img")
    expect(wrapper).toMatchSnapshot()
  })

  test("use with className", () => {
    wrapper = shallow(<CorasIcon name="PERSON" className="addClass" />)
    expect(wrapper.props().className).toMatch("coras-icon addClass")
    component = wrapper.dive()
    expect(component).toMatchSnapshot()
  })
})

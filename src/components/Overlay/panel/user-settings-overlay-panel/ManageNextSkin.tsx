import * as React from "react"
import { Field } from "react-final-form"
import { classes } from "typestyle"
import { ValidationMessages } from "../../../../validations"
import { CorasIcon } from "../../../CorasIcons/CorasIcons"

// The below mimics the look and feel of the current user overlay panel
function inputClass(meta) {
  return classes("content", meta.touched && meta.error && "errorData")
}

export const Error = ({ name, label }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    // tslint:disable-next-line
    render={({ meta: { touched, error } }) =>
      touched && error ? (
        <div>
          {ValidationMessages[error] ? ValidationMessages[error](label) : error}
        </div>
      ) : null
    }
  />
)

export const InputRow = ({ label, type, input, meta }) => (
  <>
    <div className="details-label">
      <span>{label}</span>
    </div>
    <div className="details-content">
      <input
        {...input}
        className={inputClass(meta)}
        type="text"
        placeholder={label}
      />
      <Error name={input.name} label={label} />
    </div>
  </>
)

export const Panel = props => (
  <div className="cm-user-settings-overlay-panel">
    <div className="account-header">
      <div className="settings-img">
        <div className="img">
          <CorasIcon name="SETTINGS" />
        </div>
      </div>
      <div className="view-title">
        <span className="content">Account settings</span>
      </div>
    </div>
    <div className="settings-main">{props.children}</div>
  </div>
)

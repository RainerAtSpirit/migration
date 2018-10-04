import { observer } from "mobx-react"
import * as React from "react"
import { Field } from "react-final-form"
import { classes } from "typestyle"
import { ValidationMessages } from "../../../../validations"

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

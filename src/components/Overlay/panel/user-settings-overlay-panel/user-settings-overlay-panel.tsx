import * as classNames from "classnames"
import createDecorator from "final-form-focus"
import { observer } from "mobx-react"
import * as React from "react"
import { Field, Form } from "react-final-form"
import { Button } from "semantic-ui-react"
import {
  composeValidators,
  ValidationMessages,
  Validators
} from "../../../../validations"
import "../cm-user-settings-overlay-panel/cm-user-settings-overlay-panel.less"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const focusOnErrors = createDecorator()

// Start: The below mimics the current user overlay panel instead of the user modal'
function inputClass(meta) {
  return classNames({ content: true, errorData: meta.touched && meta.error })
}

const Error = ({ name, label }) => (
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

const InputRow = ({ label, type, input, meta }) => (
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

export const UserSettingsOverlayPanel = observer(({ ...props }) => (
  <div className="cm-user-settings-overlay-panel">
    <div className="account-header">
      <div className="settings-img">
        <div className="img">
          <i className="material-icons">settings</i>
        </div>
      </div>
      <div className="view-title">
        <span className="content">Account settings</span>
      </div>
    </div>
    <UserForm {...props} />
  </div>
))

// End: The below mimics the current user overlay panel instead of the user modal'
const { max254Chars, min2Chars, required, email } = Validators
const UserForm = observer(({ initialValues, onSubmit, ...props }) => (
  <Form
    initialValues={initialValues}
    onSubmit={onSubmit}
    decorators={[focusOnErrors]}
    // tslint:disable-next-line
    render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
      <form onSubmit={handleSubmit}>
        <div className="settings-main">
          <Field
            validate={composeValidators(required, min2Chars, max254Chars)}
            name="DisplayName"
            label="Display Name"
            type="text"
            component={InputRow}
          />

          <Field
            validate={composeValidators(required, email)}
            name="Email"
            label="Email"
            type="text"
            component={InputRow}
          />

          <Field
            validate={composeValidators(required, min2Chars, max254Chars)}
            name="UserName"
            label="UserName"
            type="text"
            component={InputRow}
          />

          <div className="buttons">
            <Button primary={true} type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button
              type="button"
              onClick={reset}
              disabled={submitting || pristine}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    )}
  />
))

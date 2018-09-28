import * as classNames from "classnames"
import createDecorator from "final-form-focus"
import * as React from "react"
import { Field, Form } from "react-final-form"
import { Button } from "semantic-ui-react"
import "../cm-user-settings-overlay-panel/cm-user-settings-overlay-panel.less"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, null, 2))
}

const focusOnErrors = createDecorator()

// Start: The below mimics the current user overlay panel instead of the user modal'
function inputClass(meta) {
  return classNames({ content: true, errorData: meta.touched && meta.error })
}

// Todo: Move to validation service
function validate(values) {
  const errors: any = {}
  if (!values.DisplayName) {
    errors.DisplayName = "Display name shouldn't be empty"
  }
  if (!values.Email) {
    errors.Email = "Email shouldn't be empty"
  }
  if (!values.UserName) {
    errors.UserName = "UserName shouldn't be empty"
  }
  return errors
}

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    // tslint:disable-next-line
    render={({ meta: { touched, error } }) =>
      touched && error ? <div>{error}</div> : null
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
      <Error name={input.name} />
    </div>
  </>
)

export const UserSettingsOverlayPanel = () => (
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
    <UserForm />
  </div>
)

// End: The below mimics the current user overlay panel instead of the user modal'

const UserForm = () => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    decorators={[focusOnErrors]}
    // tslint:disable-next-line
    render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
      <form onSubmit={handleSubmit}>
        <div className="settings-main">
          <Field
            name="DisplayName"
            label="Display Name"
            type="text"
            component={InputRow}
          />

          <Field name="Email" label="Email" type="text" component={InputRow} />

          <Field
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
)

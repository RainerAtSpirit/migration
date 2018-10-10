import createDecorator from "final-form-focus"
import { observer } from "mobx-react"
import * as React from "react"
import { Field, Form } from "react-final-form"
import { Button } from "semantic-ui-react"
import { style } from "typestyle"
import { composeValidators, Validators } from "../../../../validations"
import { InputRow } from "./ManageNextSkin"

const focusOnErrors = createDecorator()
const { max254Chars, min2Chars, required, email } = Validators

export const UserForm = observer(({ initialValues, onSubmit, ...props }) => (
  <Form
    initialValues={initialValues}
    onSubmit={onSubmit}
    decorators={[focusOnErrors]}
    // tslint:disable-next-line
    render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
      <form onSubmit={handleSubmit}>
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

        <div className="actions">
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
      </form>
    )}
  />
))

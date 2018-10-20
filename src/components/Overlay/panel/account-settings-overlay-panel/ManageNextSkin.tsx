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

function renderImageOrPlaceholder(src) {
  return src ? (
    <div className="img" style={{ backgroundImage: `url('${src}')` }} />
  ) : (
    <div className="icon">
      <CorasIcon name="PERSON" />
    </div>
  )
}

function profileImageChanged(e, onChange) {
  const files = e.target.files
  const file = files[0]
  if (!file) {
    return
  }

  const reader = new FileReader()

  reader.onload = (ev: any) => {
    const result = ev.target.result

    // todo: convert into store method
    fetch("/api/UsersProfileImage", {
      method: "POST",
      body: JSON.stringify({
        base64String: result.split("base64,")[1],
        extention: "png"
      })
    })
      .then(res => res.json())
      .then(response => {
        onChange(response)
      })
      .catch(error => {
        // console.error("Error:", error)
      })
  }

  reader.readAsDataURL(file)
}

export const ProfileImage = ({ label, type, input, meta }) => {
  const { value } = input
  // https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
  delete input.value

  const onChange = e => {
    return profileImageChanged(e, input.onChange)
  }

  return (
    <>
      <div className="details-label">
        <span>{label}</span>
      </div>
      <div className="details-content">
        <div className="upload-container">
          <input
            {...input}
            type={type}
            className="fileUpload"
            onChange={onChange}
            accept=".jpg, .png, .gif, .jpeg"
          />
        </div>
        <div className="user-profile-img">
          {renderImageOrPlaceholder(value)}
        </div>
        <Error name={input.name} label={label} />
      </div>
    </>
  )
}

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

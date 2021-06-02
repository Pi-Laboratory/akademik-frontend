import { Button, Classes, Dialog, FormGroup, InputGroup, SpanGroup, } from "@blueprintjs/core";
import { Select } from "components";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "prefix": Yup.string().required(),
})

const inputPrefix = {
  "position": "relative",
  "display": "table",
  "border-collapse": "separate",
}
const prefix = {
  "padding": "6px 12px",
  "font-size": "14px",
  "font-weight": "400",
  "line-height": 1,
  // "color": "#555",
  "text-align": "center",
  "background-color": "#ffffff",
  "border": "1px solid #ccc",
  "width": "1%",
  "white-space": "nowrap",
  "vertical-align": "middle",
  "display": "table-cell",
}
const DialogGenerateAkun = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Generate Akun"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "prefix": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>

              <FormGroup
                // label="Prefix"
                labelFor="f-prefix"
                helperText={errors["prefix"]}
                intent={"danger"}
              >
                <div style={inputPrefix} >
                  <span style={prefix}>Prefix</span>
                  <InputGroup
                    inline={true}
                    id="f-prefix"
                    name="prefix"
                    value={values["prefix"]}
                    onChange={handleChange}
                    intent={errors["prefix"] ? "danger" : "none"}
                  />
                </div>
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button minimal={true} intent="danger" text="Close" />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Submit" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogGenerateAkun;
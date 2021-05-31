import { Button, Classes, Dialog, FormGroup, InputGroup, SpanGroup, } from "@blueprintjs/core";
import { Select } from "components";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama-lengkap": Yup.string().required(),
  "nik": Yup.string().required(),
  "tanggal lahir": Yup.string().required(),
  "tempat lahir": Yup.string().required(),
})

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
          "nik": "",
          "nama-lengkap": "",
          "tanggal-lahir": "",
          "tempat-lahir": "",
          "alamat": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              
              <FormGroup
                label="Prefix"
                labelFor="f-prefix"
                helperText={errors["prefix"]}
                intent={"danger"}
              >
                
                <InputGroup
                span="sksk"
                  id="f-prefix"
                  name="prefix"
                  value={values["prefix"]}
                  onChange={handleChange}
                  intent={errors["prefix"] ? "danger" : "none"}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button minimal={true} intent="danger" text="Close" />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogGenerateAkun;
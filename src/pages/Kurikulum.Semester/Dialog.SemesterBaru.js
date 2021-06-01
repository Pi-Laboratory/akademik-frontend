import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "semester": Yup.string().required(),
  "tahun": Yup.string().required(),
})

const DialogDosenBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Dosen Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "semester": "",
          "tahun": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup
                label="Tahun"
                labelFor="f-tahun"
                helperText={errors["tahun"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-tahun"
                  name="tahun"
                  value={values["tahun"]}
                  onChange={handleChange}
                  intent={errors["tahun"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Semester"
                labelFor="f-semester"
                helperText={errors["semester"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-semester"
                  name="semester"
                  value={values["semester"]}
                  onChange={handleChange}
                  intent={errors["semester"] ? "danger" : "none"}
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

export default DialogDosenBaru;
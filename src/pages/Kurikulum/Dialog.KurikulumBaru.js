import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "ipk-min": Yup.string().required(),
  "nip": Yup.string().required(),
})

const DialogKurikulumBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Kurikulum Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "ipk-min": "",
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
                label="IPK Min"
                labelFor="f-ipk-min"
                helperText={errors["ipk-min"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-ipk-min"
                  name="ipk-min"
                  value={values["ipk-min"]}
                  onChange={handleChange}
                  intent={errors["ipk-min"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="IPK Min Percobaan"
                labelFor="f-ipk-min-p"
                helperText={errors["ipk-min-p"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-ipk-min-p"
                  name="ipk-min-p"
                  value={values["ipk-min-p"]}
                  onChange={handleChange}
                  intent={errors["ipk-min-p"] ? "danger" : "none"}
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

export default DialogKurikulumBaru;
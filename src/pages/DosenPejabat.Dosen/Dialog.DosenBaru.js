import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama-lengkap": Yup.string().required(),
  "nip": Yup.string().required(),
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
          "nama-lengkap": "",
          "nip": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup
                label="NIP"
                labelFor="f-nip"
                helperText={errors["nip"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nip"
                  name="nip"
                  value={values["nip"]}
                  onChange={handleChange}
                  intent={errors["nip"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Nama Lengkap"
                labelFor="f-nama-lengkap"
                helperText={errors["nama-lengkap"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama-lengkap"
                  name="nama-lengkap"
                  value={values["nama-lengkap"]}
                  onChange={handleChange}
                  intent={errors["nama-lengkap"] ? "danger" : "none"}
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
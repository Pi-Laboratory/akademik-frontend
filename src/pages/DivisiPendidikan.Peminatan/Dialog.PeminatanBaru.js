import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama-peminatan": Yup.string().required(),
})

const DialogPeminatanBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Peminatan"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nama-peminatan": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              
              <FormGroup
                label="Nama Peminatan"
                labelFor="f-nama-peminatan"
                helperText={errors["nama-peminatan"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama-peminatan"
                  name="nama-peminatan"
                  value={values["nama-peminatan"]}
                  onChange={handleChange}
                  intent={errors["nama-peminatan"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Kode"
                labelFor="f-kode"
                helperText={errors["kode"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-kode"
                  name="kode"
                  value={values["kode"]}
                  onChange={handleChange}
                  intent={errors["kode"] ? "danger" : "none"}
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

export default DialogPeminatanBaru;
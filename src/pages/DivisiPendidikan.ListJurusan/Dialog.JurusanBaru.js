import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama-jurusan": Yup.string().required(),
})

const DialogJurusanBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Jurusan"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nama-jurusan": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              
              <FormGroup
                label="Nama Jurusan"
                labelFor="f-nama-jurusan"
                helperText={errors["nama-jurusan"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama-jurusan"
                  name="nama-jurusan"
                  value={values["nama-jurusan"]}
                  onChange={handleChange}
                  intent={errors["nama-jurusan"] ? "danger" : "none"}
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

export default DialogJurusanBaru;
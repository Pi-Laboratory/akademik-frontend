import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama-matakuliah": Yup.string().required(),
  "kode-matakuliah": Yup.string().required(),
})

const DialogJadwalBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Kelas Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nama-matakuliah": "",
          "kode-matakuliah": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup
                label="Kode Mata Kuliah"
                labelFor="f-kode-matakuliah"
                helperText={errors["kode-matakuliah"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-kode-matakuliah"
                  name="kode-matakuliah"
                  value={values["kode-matakuliah"]}
                  onChange={handleChange}
                  intent={errors["kode-matakuliah"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Nama Mata Kuliah"
                labelFor="f-nama-matakuliah"
                helperText={errors["nama-matakuliah"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama-matakuliah"
                  name="nama-matakuliah"
                  value={values["nama-matakuliah"]}
                  onChange={handleChange}
                  intent={errors["nama-matakuliah"] ? "danger" : "none"}
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

export default DialogJadwalBaru;
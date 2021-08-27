import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama-kelas": Yup.string().required(),
  "kode-kelas": Yup.string().required(),
})

const DialogKelasBaru = ({ isOpen, onClose = () => { } }) => {
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
                label="Nama Kelas"
                labelFor="f-nama-kelas"
                helperText={errors["nama-kelas"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama-kelas"
                  name="nama-kelas"
                  value={values["nama-kelas"]}
                  onChange={handleChange}
                  intent={errors["nama-kelas"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Kode kelas"
                labelFor="f-kode-kelas"
                helperText={errors["kode-kelas"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-kode-kelas"
                  name="kode-kelas"
                  value={values["kode-kelas"]}
                  onChange={handleChange}
                  intent={errors["kode-kelas"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Dosen Penanggung Jawab"
                labelFor="f-dosen-penanggung-jawab"
                helperText={errors["dosen-penanggung-jawab"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-dosen-penanggung-jawab"
                  name="dosen-penanggung-jawab"
                  value={values["dosen-penanggung-jawab"]}
                  onChange={handleChange}
                  intent={errors["dosen-penanggung-jawab"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Mahasiswa"
                labelFor="f-mahasiswa"
                helperText={errors["mahasiswa"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-mahasiswa"
                  name="mahasiswa"
                  value={values["mahasiswa"]}
                  onChange={handleChange}
                  intent={errors["mahasiswa"] ? "danger" : "none"}
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

export default DialogKelasBaru;
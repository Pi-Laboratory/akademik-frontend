import { Button, Classes, Dialog, FormGroup, InputGroup ,FileInput ,} from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama-lengkap": Yup.string().required(),
  "nik": Yup.string().required(),
  "tanggal lahir": Yup.string().required(),
  "tempat lahir": Yup.string().required(),
})

const DialogDosenBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Mahasiswa"
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
                label="NIK"
                labelFor="f-nik"
                helperText={errors["nik"]}
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
              <FormGroup
                label="Tanggal Lahir"
                labelFor="f-tanggal-lahir"
                helperText={errors["tanggal-lahir"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-tanggal-lahir"
                  name="tanggal-lahir"
                  value={values["tanggal-lahir"]}
                  onChange={handleChange}
                  intent={errors["tanggal-lahir"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tempat Lahir"
                labelFor="f-tempat-lahir"
                helperText={errors["tempat-lahir"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-tempat-lahir"
                  name="tempat-lahir"
                  value={values["tempat-lahir"]}
                  onChange={handleChange}
                  intent={errors["tempat-lahir"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Asal Sekolah"
                labelFor="f-asal-sekolah"
                helperText={errors["asal-sekolah"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-asal-sekolah"
                  name="asal-sekolah"
                  value={values["asal-sekolah"]}
                  onChange={handleChange}
                  intent={errors["asal-sekolah"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Ijazah"
                labelFor="f-ijazah"
                helperText={errors["ijazah"]}
                intent={"danger"}
              >
                <FileInput
                  id="f-ijazah"
                  name="ijazah"
                  value={values["ijazah"]}
                  onChange={handleChange}
                  intent={errors["ijazah"] ? "danger" : "none"}
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
import { Button, Classes, Dialog, FormGroup, InputGroup, FileInput, RadioGroup, Radio, } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Select, } from "components";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama-lengkap": Yup.string().required(),
  "nik": Yup.string().required(),
  "tanggal lahir": Yup.string().required(),
  "tempat lahir": Yup.string().required(),
})


const DialogMahasiswaBaru = ({ isOpen, onClose = () => { } }) => {
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
                label="Jalur Pendaftaran"
                labelFor="f-jalur-pendaftaran"
                helperText={errors["jalur-pendaftaran"]}
                intent={"danger"}
              >
                <div class="bp3-select .modifier">
                  <select>
                    <option selected>-- PILIH ---</option>
                    <option value="1">MAN (Mandiri)</option>
                    <option value="2">KIP (Kartu Indonesia Pintar)</option>
                    <option value="3">PLN (Kerjasama PT.PLN)</option>
                    <option value="4">PSB (Penelusuran Siswa Berpotensi)</option>
                    <option value="5">REG (Reguler)</option>
                    <option value="6">SBMPN (Seleksi Barsama Masuk Politeknik Negeri(D3))</option>
                    <option value="7">SBMPTN (Seleksi Barsama Masuk Perguruan Tinggi Negeri(S.tr))</option>
                    <option value="8">SEM (Semua)</option>
                    <option value="9">SMK (Kelas Khusus SMK)</option>
                    <option value="10">SNMPN (Seleksi Nasional Masuk Politeknik Negeri(D3))</option>
                    <option value="11">SNMPTN (Seleksi Nasional Masuk Perguruan Tinggi Negeri )</option>
                    <option value="12">SPA (Seleksi Potensi Akademik)</option>
                    <option value="13">UMPN  (UMPN Politeknik Negeri Manado)</option>
                  </select>
                </div>
              </FormGroup>
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
                label="Gender"
                labelFor="f-gender"
                helperText={errors["gender"]}
                intent={"danger"}
              >
                <Radio inline={true} name="gender" label="Laki-Laki" value="one" />
                <Radio inline={true} name="gender" label="Perempuan" value="two" />
              </FormGroup>

              <FormGroup
                label="Tanggal Lahir"
                labelFor="f-tanggal-lahir"
                helperText={errors["tanggal-lahir"]}
                intent={"danger"}
              >
                <InputGroup
                  type="date"
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

export default DialogMahasiswaBaru;
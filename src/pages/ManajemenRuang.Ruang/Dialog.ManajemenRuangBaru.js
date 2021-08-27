import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "ipk-min": Yup.string().required(),
  "nip": Yup.string().required(),
})

const DialogJadwalBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Ruangan"
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
                label="Tipe"
                labelFor="f-tipe"
                helperText={errors["tipe"]}
                intent={"danger"}
              >
                <div class="bp3-select .modifier">
                  <select>
                    <option selected>-- PILIH --</option>
                    <option value="1">Ruangan</option>
                    <option value="2">Gedung</option>
                    <option value="3">Laboratorium</option>
                  </select>
                </div>
              </FormGroup>
              <FormGroup
                label="Nama"
                labelFor="f-nama"
                helperText={errors["nama"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama"
                  name="nama"
                  value={values["nama"]}
                  onChange={handleChange}
                  intent={errors["nama"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="kode"
                labelFor="kode"
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
              <FormGroup
                label="Status"
                labelFor="f-status"
                helperText={errors["status"]}
                intent={"danger"}
              >
                <div class="bp3-select .modifier">
                  <select>
                    <option selected>-- PILIH --</option>
                    <option value="1">Layak</option>
                    <option value="2">Tidak Layak</option>
                  </select>
                </div>
              </FormGroup>
              <FormGroup
                label="Kapasitas"
                labelFor="kapasitas"
                helperText={errors["kapasitas"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-kapasitas"
                  name="kapasitas"
                  value={values["kapasitas"]}
                  onChange={handleChange}
                  intent={errors["kapasitas"] ? "danger" : "none"}
                />
              </FormGroup>
              <h6 className={Classes.HEADING}>Pengelolah</h6>
              <FormGroup
                label="Jurusan"
                labelFor="jurusan"
                helperText={errors["jurusan"]}
                intent={"danger"}
              >
                <div class="bp3-select .modifier">
                  <select>
                    <option selected>-- PILIH --</option>
                    <option value="1">Teknik Sipil</option>
                    <option value="2">Teknik Mesin</option>
                    <option value="3">Teknik Elektro</option>
                    <option value="4">Akademi Pariwisata</option>
                    <option value="5">Akuntansi</option>
                    <option value="6">Administrasi Bisnis</option>
                    
                  </select>
                </div>
              </FormGroup>
              <FormGroup
                label="Program Studi"
                labelFor="program-studi"
                helperText={errors["program-studi"]}
                intent={"danger"}
              >
                <div class="bp3-select .modifier">
                  <select>
                    <option selected>-- PILIH --</option>
                    <option value="1">Teknik Sipil (D3)</option>
                    <option value="2">Konstruksi Bangunan (D4)</option>
                    <option value="3">Teknik Informatika (D4)</option>
                    <option value="4">Teknik Komputer (D3)</option>
                    <option value="5">Teknik Listrik (D3)</option>
                    <option value="6">Teknik Listrik (D4)</option>
                    <option value="7">Teknik Mesin (D3)</option>
                    <option value="8">Perpajakan (D4)</option>
                    <option value="9">Akuntansi (D3)</option>
                    <option value="10">Manajemen Bisnis (D4)</option>
                    <option value="11">Perhotelan (D3)</option>
                    <option value="12">Usaha Perjalanan Wisata (D3)</option>
                    <option value="13">Ekowisata Bawah Laut (D3)</option>
                  </select>
                </div>
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
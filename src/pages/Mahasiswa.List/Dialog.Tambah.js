import { Button, Classes, Dialog, FormGroup, HTMLSelect, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box, Divider, Flex, useClient } from "components";
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nim": Yup.string().required(),
  "name": Yup.string().required(),
  "gender": Yup.string().required(),
  "birth_city": Yup.string().required(),
  "birth_date": Yup.date().required(),
  "religion": Yup.string().required(),
  "origin_address": Yup.string().required(),
  "recent_address": Yup.string().required(),
  "city": Yup.string().required(),
  "postal_code": Yup.string().required(),
  "phone_number": Yup.string().required(),
  "cellular_number": Yup.string().required(),
  "email": Yup.string().required(),
  "photo": Yup.string().required(),
  "generation": Yup.string().required(),
  "registration_number": Yup.string().required(),
  "registration_date": Yup.date().required(),
  "student_status": Yup.boolean().required(),

  "father_name": Yup.string().required(),
  "father_birth_date": Yup.date().required(),
  "father_status": Yup.string().required(),
  "father_death_date": Yup.date().required(),
  "father_education": Yup.string().required(),
  "father_recent_education": Yup.string().required(),
  "father_occupation": Yup.string().required(),

  "mother_name": Yup.string().required(),
  "mother_birth_date": Yup.date().required(),
  "mother_status": Yup.string().required(),
  "mother_death_date": Yup.date().required(),
  "mother_education": Yup.string().required(),
  "mother_recent_education": Yup.string().required(),
  "mother_occupation": Yup.string().required(),

  "trustee_name": Yup.string().required(),
  "trustee_birth_date": Yup.date().required(),
  "trustee_status": Yup.string().required(),
  "trustee_death_date": Yup.date().required(),
  "trustee_education": Yup.string().required(),
  "trustee_recent_education": Yup.string().required(),
  "trustee_occuppation": Yup.string().required(),
})

const DialogTambah = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Mahasiswa"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nim": "",
          "name": "",
          "gender": "",
          "birth_city": "",
          "birth_date": new Date(),
          "religion": "",
          "origin_address": "",
          "recent_address": "",
          "city": "",
          "postal_code": "",
          "phone_number": "",
          "cellular_number": "",
          "email": "",
          "photo": "",
          "generation": "",
          "registration_number": "",
          "registration_date": new Date(),
          "student_status": false,

          "father_name": "",
          "father_birth_date": "",
          "father_status": "",
          "father_death_date": "",
          "father_education": "",
          "father_recent_education": "",
          "father_occupation": "",

          "mother_name": "",
          "mother_birth_date": "",
          "mother_status": "",
          "mother_death_date": "",
          "mother_education": "",
          "mother_recent_education": "",
          "mother_occupation": "",

          "trustee_name": "",
          "trustee_birth_date": "",
          "trustee_status": "",
          "trustee_death_date": "",
          "trustee_education": "",
          "trustee_recent_education": "",
          "trustee_occupation": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["majors"].create({
              "name": values["name"]
            });
            onClose();
            onSubmitted(res);
          } catch (err) {
            console.error(err);
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup
                label="Photo"
                labelFor="f-photo"
                helperText={errors["photo"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-photo"
                  name="photo"
                  value={values["photo"]}
                  onChange={handleChange}
                  intent={errors["photo"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="NIM"
                labelFor="f-nim"
                helperText={errors["nim"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nim"
                  name="nim"
                  value={values["nim"]}
                  onChange={handleChange}
                  intent={errors["nim"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Nama"
                labelFor="f-name"
                helperText={errors["name"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-name"
                  name="name"
                  value={values["name"]}
                  onChange={handleChange}
                  intent={errors["name"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Jenis Kelamin"
                labelFor="f-gender"
                helperText={errors["gender"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-gender"
                  name="gender"
                  value={values["gender"]}
                  onChange={handleChange}
                  intent={errors["gender"] ? "danger" : "none"}
                  options={[
                    { label: "Pilih", value: "", disabled: true },
                    "Pria",
                    "Wanita",
                    "Tidak ingin disebutkan"
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Agama"
                labelFor="f-religion"
                helperText={errors["religion"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-religion"
                  name="religion"
                  value={values["religion"]}
                  onChange={handleChange}
                  intent={errors["religion"] ? "danger" : "none"}
                  options={[
                    { label: "Pilih", value: "", disabled: true },
                    "Kristen Protestan",
                    "Kristen Katholik",
                    "Islam",
                    "Hindu",
                    "Buddha",
                    "Konghucu",
                    "Lainnya",
                  ]}
                />
              </FormGroup>
              <Flex sx={{
                mx: -2,
                "> div": {
                  width: "50%",
                  px: 2,
                  flexGrow: 1,
                }
              }}>
                <Box>
                  <FormGroup
                    label="Kota Kelahiran"
                    labelFor="f-birth_city"
                    helperText={errors["birth_city"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-birth_city"
                      name="birth_city"
                      value={values["birth_city"]}
                      onChange={handleChange}
                      intent={errors["birth_city"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Tanggal Kelahiran"
                    labelFor="f-birth_date"
                    helperText={errors["birth_date"]}
                    intent={"danger"}
                  >
                    <DateInput
                      fill={true}
                      id="f-birth_date"
                      name="birth_date"
                      value={values["birth_date"]}
                      intent={errors["birth_date"] ? "danger" : "none"}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                      onChange={(v) => {
                        setFieldValue("birth_date", v);
                      }}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Alamat Asal"
                labelFor="f-origin_address"
                helperText={errors["origin_address"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-origin_address"
                  name="origin_address"
                  value={values["origin_address"]}
                  onChange={handleChange}
                  intent={errors["origin_address"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Alamat Sekarang"
                labelFor="f-recent_address"
                helperText={errors["recent_address"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-recent_address"
                  name="recent_address"
                  value={values["recent_address"]}
                  onChange={handleChange}
                  intent={errors["recent_address"] ? "danger" : "none"}
                />
              </FormGroup>
              <Flex sx={{
                mx: -2,
                "> div": {
                  width: "50%",
                  px: 2,
                  flexGrow: 1,
                }
              }}>
                <Box>
                  <FormGroup
                    label="Kota"
                    labelFor="f-city"
                    helperText={errors["city"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-city"
                      name="city"
                      value={values["city"]}
                      onChange={handleChange}
                      intent={errors["city"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Kode Pos"
                    labelFor="f-postal_code"
                    helperText={errors["postal_code"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-postal_code"
                      name="postal_code"
                      value={values["postal_code"]}
                      onChange={handleChange}
                      intent={errors["postal_code"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Nomor Handphone"
                labelFor="f-cellular_number"
                helperText={errors["cellular_number"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-cellular_number"
                  name="cellular_number"
                  value={values["cellular_number"]}
                  onChange={handleChange}
                  intent={errors["cellular_number"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Email"
                labelFor="f-email"
                helperText={errors["email"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-email"
                  name="email"
                  value={values["email"]}
                  onChange={handleChange}
                  intent={errors["email"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Angkatan"
                labelFor="f-generation"
                helperText={errors["generation"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-generation"
                  name="generation"
                  value={values["generation"]}
                  onChange={handleChange}
                  intent={errors["generation"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Nomor Registrasi"
                labelFor="f-registration_number"
                helperText={errors["registration_number"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-registration_number"
                  name="registration_number"
                  value={values["registration_number"]}
                  onChange={handleChange}
                  intent={errors["registration_number"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal Registrasi"
                labelFor="f-registraion_date"
                helperText={errors["registraion_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-registraion_date"
                  name="registraion_date"
                  value={values["registraion_date"]}
                  intent={errors["registraion_date"] ? "danger" : "none"}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("registraion_date", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Status Mahasiswa"
                labelFor="f-student_status"
                helperText={errors["student_status"]}
                intent={"danger"}
              >
                <RadioGroup
                  id="f-student_status"
                  name="student_status"
                  selectedValue={values["student_status"]}
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleChange(e);
                  }}
                  intent={errors["student_status"] ? "danger" : "none"}
                >
                  <Radio label="Aktif" value={"true"} />
                  <Radio label="Belum Aktif" value={"false"} />
                </RadioGroup>
              </FormGroup>
              <Divider />
              <h6 className={Classes.HEADING}>Identitas Ayah</h6>
              <FormGroup
                label="Nama"
                labelFor="f-father_name"
                helperText={errors["father_name"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-father_name"
                  name="father_name"
                  value={values["father_name"]}
                  onChange={handleChange}
                  intent={errors["father_name"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal Kelahiran"
                labelFor="f-father_birth_date"
                helperText={errors["father_birth_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-father_birth_date"
                  name="father_birth_date"
                  value={values["father_birth_date"]}
                  intent={errors["father_birth_date"] ? "danger" : "none"}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("father_birth_date", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Status"
                labelFor="f-father_status"
                helperText={errors["father_status"]}
                intent={"danger"}
              >
                <RadioGroup
                  id="f-father_status"
                  name="father_status"
                  selectedValue={values["father_status"]}
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleChange(e);
                  }}
                  intent={errors["father_status"] ? "danger" : "none"}
                >
                  <Radio label="Aktif" value={"true"} />
                  <Radio label="Meninggal" value={"false"} />
                </RadioGroup>
              </FormGroup>
              <FormGroup
                label="Tanggal Meninggal"
                labelFor="f-father_death_date"
                helperText={errors["father_death_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-father_death_date"
                  name="father_death_date"
                  value={values["father_death_date"]}
                  intent={errors["father_death_date"] ? "danger" : "none"}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("father_death_date", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Pendidikan"
                labelFor="f-father_education"
                helperText={errors["father_education"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-father_education"
                  name="father_education"
                  value={values["father_education"]}
                  onChange={handleChange}
                  intent={errors["father_education"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Pendidikan Terakhir"
                labelFor="f-father_recent_education"
                helperText={errors["father_recent_education"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-father_recent_education"
                  name="father_recent_education"
                  value={values["father_recent_education"]}
                  onChange={handleChange}
                  intent={errors["father_recent_education"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Pekerjaan"
                labelFor="f-father_occupation"
                helperText={errors["father_occupation"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-father_occupation"
                  name="father_occupation"
                  value={values["father_occupation"]}
                  onChange={handleChange}
                  intent={errors["father_occupation"] ? "danger" : "none"}
                />
              </FormGroup>

              <Divider />
              <h6 className={Classes.HEADING}>Identitas Ibu</h6>
              <FormGroup
                label="Nama"
                labelFor="f-mother_name"
                helperText={errors["mother_name"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-mother_name"
                  name="mother_name"
                  value={values["mother_name"]}
                  onChange={handleChange}
                  intent={errors["mother_name"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal Kelahiran"
                labelFor="f-mother_birth_date"
                helperText={errors["mother_birth_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-mother_birth_date"
                  name="mother_birth_date"
                  value={values["mother_birth_date"]}
                  intent={errors["mother_birth_date"] ? "danger" : "none"}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("mother_birth_date", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Status"
                labelFor="f-mother_status"
                helperText={errors["mother_status"]}
                intent={"danger"}
              >
                <RadioGroup
                  id="f-mother_status"
                  name="mother_status"
                  selectedValue={values["mother_status"]}
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleChange(e);
                  }}
                  intent={errors["mother_status"] ? "danger" : "none"}
                >
                  <Radio label="Aktif" value={"true"} />
                  <Radio label="Meninggal" value={"false"} />
                </RadioGroup>
              </FormGroup>
              <FormGroup
                label="Tanggal Meninggal"
                labelFor="f-mother_death_date"
                helperText={errors["mother_death_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-mother_death_date"
                  name="mother_death_date"
                  value={values["mother_death_date"]}
                  intent={errors["mother_death_date"] ? "danger" : "none"}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("mother_death_date", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Pendidikan"
                labelFor="f-mother_education"
                helperText={errors["mother_education"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-mother_education"
                  name="mother_education"
                  value={values["mother_education"]}
                  onChange={handleChange}
                  intent={errors["mother_education"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Pendidikan Terakhir"
                labelFor="f-mother_recent_education"
                helperText={errors["mother_recent_education"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-mother_recent_education"
                  name="mother_recent_education"
                  value={values["mother_recent_education"]}
                  onChange={handleChange}
                  intent={errors["mother_recent_education"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Pekerjaan"
                labelFor="f-mother_occupation"
                helperText={errors["mother_occupation"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-mother_occupation"
                  name="mother_occupation"
                  value={values["mother_occupation"]}
                  onChange={handleChange}
                  intent={errors["mother_occupation"] ? "danger" : "none"}
                />
              </FormGroup>

              <Divider />
              <h6 className={Classes.HEADING}>Identitas Wali</h6>
              <FormGroup
                label="Nama"
                labelFor="f-trustee_name"
                helperText={errors["trustee_name"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-trustee_name"
                  name="trustee_name"
                  value={values["trustee_name"]}
                  onChange={handleChange}
                  intent={errors["trustee_name"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal Kelahiran"
                labelFor="f-trustee_birth_date"
                helperText={errors["trustee_birth_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-trustee_birth_date"
                  name="trustee_birth_date"
                  value={values["trustee_birth_date"]}
                  intent={errors["trustee_birth_date"] ? "danger" : "none"}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("trustee_birth_date", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Status"
                labelFor="f-trustee_status"
                helperText={errors["trustee_status"]}
                intent={"danger"}
              >
                <RadioGroup
                  id="f-trustee_status"
                  name="trustee_status"
                  selectedValue={values["trustee_status"]}
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleChange(e);
                  }}
                  intent={errors["trustee_status"] ? "danger" : "none"}
                >
                  <Radio label="Aktif" value={"true"} />
                  <Radio label="Meninggal" value={"false"} />
                </RadioGroup>
              </FormGroup>
              <FormGroup
                label="Tanggal Meninggal"
                labelFor="f-trustee_death_date"
                helperText={errors["trustee_death_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-trustee_death_date"
                  name="trustee_death_date"
                  value={values["trustee_death_date"]}
                  intent={errors["trustee_death_date"] ? "danger" : "none"}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("trustee_death_date", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Pendidikan"
                labelFor="f-trustee_education"
                helperText={errors["trustee_education"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-trustee_education"
                  name="trustee_education"
                  value={values["trustee_education"]}
                  onChange={handleChange}
                  intent={errors["trustee_education"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Pendidikan Terakhir"
                labelFor="f-trustee_recent_education"
                helperText={errors["trustee_recent_education"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-trustee_recent_education"
                  name="trustee_recent_education"
                  value={values["trustee_recent_education"]}
                  onChange={handleChange}
                  intent={errors["trustee_recent_education"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Pekerjaan"
                labelFor="f-trustee_occupation"
                helperText={errors["trustee_occupation"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-trustee_occupation"
                  name="trustee_occupation"
                  value={values["trustee_occupation"]}
                  onChange={handleChange}
                  intent={errors["trustee_occupation"] ? "danger" : "none"}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                  minimal={true}
                  intent="danger"
                  text="Close"
                  onClick={() => onClose()}
                />
                <Button
                  loading={isSubmitting}
                  type="submit"
                  intent="primary"
                  text="Simpan"
                />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogTambah;
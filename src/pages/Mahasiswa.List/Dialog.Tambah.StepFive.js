import { Classes, Tag } from "@blueprintjs/core";
import { Box } from "components";
import { useFormikContext } from "formik";
import moment from "moment";
import { useEffect } from "react";
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
  "email": Yup.string().required(),
  "generation": Yup.string().required(),
  "registration_number": Yup.string().required(),
  "registration_date": Yup.date().required(),
  "student_status": Yup.boolean().required(),

  "father_name": Yup.string(),
  "father_birth_date": Yup.date()
    .when("father_name", {
      is: v => !!v,
      then: Yup.date().required()
    }),
  "father_status": Yup.boolean().required(),
  "father_death_date": Yup.date()
    .when("father_status", {
      is: "false",
      then: Yup.date().required()
    }),
  "father_education": Yup.string()
    .when("father_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "father_recent_education": Yup.string()
    .when("father_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "father_occupation": Yup.string()
    .when("father_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),

  "mother_name": Yup.string(),
  "mother_birth_date": Yup.date()
    .when("mother_name", {
      is: v => !!v,
      then: Yup.date().required()
    }),
  "mother_status": Yup.string().required(),
  "mother_death_date": Yup.date()
    .when("mother_status", {
      is: "false",
      then: Yup.date().required()
    }),
  "mother_education": Yup.string()
    .when("mother_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "mother_recent_education": Yup.string()
    .when("mother_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "mother_occupation": Yup.string()
    .when("mother_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),

  "trustee_name": Yup.string(),
  "trustee_birth_date": Yup.date()
    .when("trustee_name", {
      is: v => !!v,
      then: Yup.date().required()
    }),
  "trustee_status": Yup.string().required(),
  "trustee_death_date": Yup.date()
    .when("trustee_status", {
      is: "false",
      then: Yup.date().required()
    }),
  "trustee_education": Yup.string()
    .when("trustee_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "trustee_recent_education": Yup.string()
    .when("trustee_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "trustee_occupation": Yup.string()
    .when("trustee_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
});

export const StepFive = {
  panel: DialogTambahStepFive,
  validationSchema: Schema
}

function DialogTambahStepFive() {
  const { values, errors, handleChange, setFieldValue, validateForm } = useFormikContext();
  useEffect(() => {
    validateForm();
  }, []);
  return (
    <div className={Classes.DIALOG_BODY}>
      <Box sx={{ minHeight: "50vh" }}>
        <h4 className={Classes.HEADING}>Anda yakin data yang Anda masukan sudah lengkap?</h4>
        <Box className={Classes.RUNNING_TEXT}>
          <h5>Identitas Mahasiswa</h5>
          {[
            { label: "NIM", field: "nim" },
            { label: "Name", field: "name" },
            { label: "Jenis Kelamin", field: "gender" },
            { label: "Agama", field: "religion" },
            { label: "Kota Kelahiran", field: "birth_city" },
            { label: "Tanggal Kelahiran", field: "birth_date", value: val => val && moment(val).format("DD MMMM YYYY") },
            { label: "Alamat Asal", field: "origin_address" },
            { label: "Alamat Sekarang", field: "recent_address" },
            { label: "Kota", field: "city" },
            { label: "Kode Pos", field: "postal_code" },
            { label: "Nomor Telephone", field: "phone_number" },
            { label: "Email", field: "email" },
            { label: "Angkatan", field: "generation" },
            { label: "Nomor Registrasi", field: "registration_number" },
            { label: "Tanggal Registrasi", field: "registration_date", value: val => val && moment(val).format("DD MMMM YYYY") },
            { label: "Status Mahasiswa", field: "student_status", value: val => Boolean(val) ? "Aktif" : "Tidak Aktif" },
          ].map(({ label, field, value = (val) => val }) =>
            <Box key={field} sx={{ display: "inline-block", mb: 2 }}>
              <Box sx={{ pr: 3 }}>
                <Tag intent={errors[field] && "danger"}>{label}</Tag>
                : {values[field] !== undefined ? value(values[field]) : "NULL"}
              </Box>
            </Box>
          )}
          <h5>Identitas Ayah</h5>
          {[
            { label: "Nama", field: "father_name" },
            { label: "Tanggal Lahir", field: "father_birth_date", value: val => val && moment(val).format("DD MMMM YYYY") },
            { label: "Pendidikan", field: "father_education" },
            { label: "Pendidikan Terakhir", field: "father_recent_education" },
            { label: "Pekerjaan", field: "father_occupation" },
            { label: "Tanggal Kematian", field: "father_death_date", value: val => val && moment(val).format("DD MMMM YYYY") },
          ].map(({ label, field, value = (val) => val }) =>
            <Box key={field} sx={{ display: "inline-block", mb: 2 }}>
              <Box sx={{ pr: 3 }}>
                <Tag intent={errors[field] && "danger"}>{label}</Tag>
                : {values[field] !== undefined ? value(values[field]) : "NULL"}
              </Box>
            </Box>
          )}
          <h5>Identitas Ibu</h5>
          {[
            { label: "Nama", field: "mother_name" },
            { label: "Tanggal Lahir", field: "mother_birth_date", value: val => val && moment(val).format("DD MMMM YYYY") },
            { label: "Pendidikan", field: "mother_education" },
            { label: "Pendidikan Terakhir", field: "mother_recent_education" },
            { label: "Pekerjaan", field: "mother_occupation" },
            { label: "Tanggal Kematian", field: "mother_death_date", value: val => val && moment(val).format("DD MMMM YYYY") },
          ].map(({ label, field, value = (val) => val }) =>
            <Box key={field} sx={{ display: "inline-block", mb: 2 }}>
              <Box sx={{ pr: 3 }}>
                <Tag intent={errors[field] && "danger"}>{label}</Tag>
                : {values[field] !== undefined ? value(values[field]) : "NULL"}
              </Box>
            </Box>
          )}
          <h5>Identitas Wali</h5>
          {[
            { label: "Nama", field: "trustee_name" },
            { label: "Tanggal Lahir", field: "trustee_birth_date", value: val => val && moment(val).format("DD MMMM YYYY") },
            { label: "Pendidikan", field: "trustee_education" },
            { label: "Pendidikan Terakhir", field: "trustee_recent_education" },
            { label: "Pekerjaan", field: "trustee_occupation" },
            { label: "Tanggal Kematian", field: "trustee_death_date", value: val => val && moment(val).format("DD MMMM YYYY") },
          ].map(({ label, field, value = (val) => val }) =>
            <Box key={field} sx={{ display: "inline-block", mb: 2 }}>
              <Box sx={{ pr: 3 }}>
                <Tag intent={errors[field] && "danger"}>{label}</Tag>
                : {values[field] !== undefined ? value(values[field]) : "NULL"}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div >
  )
}

export default DialogTambahStepFive;

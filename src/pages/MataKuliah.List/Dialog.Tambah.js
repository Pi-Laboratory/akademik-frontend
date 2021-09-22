import { Button, Classes, Dialog, FileInput, FormGroup, HTMLSelect, InputGroup } from "@blueprintjs/core";
import { Divider, Select, useClient } from "components";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "name": Yup.string().required(),
  "code": Yup.string().required(),
  "stheory": Yup.number().required(),
  "spractice": Yup.number().required(),
  "spractice_field": Yup.number().required(),
  "stotal": Yup.number().required(),
  "total_hours": Yup.number().required(),
  "type": Yup.string().required(),
  "minimum_pass_score": Yup.number().required(),
  "semester": Yup.number().required(),
  "subject_trait": Yup.string().required(),
  "study_plan": Yup.string().required(),
  "study_matter": Yup.string().required(),
  "study_note": Yup.string().required(),
  "abstract": Yup.string(),
  "syllabus_file": Yup.string(),
  "major_id": Yup.number().required(),
  "study_program_id": Yup.number().required(),
  "curriculum_id": Yup.number().required(),
})

const DialogMataKuliahBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [curriculums, setCurriculums] = useState([]);
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState({
    curriculums: false,
    studyPrograms: false,
    majors: false
  })

  const fetchCurriculums = useCallback(async () => {
    setLoading(loading => ({ ...loading, curriculums: true }));
    const res = await client["curriculums"].find({
      query: {
        $select: ["id", "name"]
      }
    });
    setCurriculums(res.data.map(({ id, name }) => ({
      label: name,
      value: id
    })));
    setLoading(loading => ({ ...loading, curriculums: false }));
  }, [client]);

  const fetchMajors = useCallback(async () => {
    setLoading(loading => ({ ...loading, majors: true }));
    const res = await client["majors"].find({
      query: {
        $select: ["id", "name"]
      }
    });
    setMajors(res.data.map(({ id, name }) => ({
      label: name,
      value: id
    })));
    setLoading(loading => ({ ...loading, majors: false }));
  }, [client]);

  const fetchStudyPrograms = useCallback(async (major) => {
    setLoading(loading => ({ ...loading, studyPrograms: true }));
    const res = await client["study-programs"].find({
      query: {
        major_id: major,
        $select: ["id", "name"]
      }
    });
    await setStudyPrograms(res.data.map(({ id, name }) => ({
      label: name,
      value: id
    })));
    setLoading(loading => ({ ...loading, studyPrograms: false }));
  }, [client]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Mata Kuliah Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "name": "",
          "code": "",
          "stheory": "",
          "spractice": "",
          "spractice_field": "",
          "stotal": "",
          "type": "Teori",
          "minumum_pass_score": "",
          "semester": "",
          "subject_trait": "Wajib",
          "study_plan": "Ada",
          "study_matter": "Ada",
          "study_note": "Ada",
          "abstract": "",
          "syllabus_file": "",
          "major_id": "",
          "study_program_id": "",
          "curriculum_id": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["subjects"].create(values);
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
                label="Nama Mata Kuliah"
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
                label="Kode Mata Kuliah"
                labelFor="f-code"
                helperText={errors["code"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-code"
                  name="code"
                  value={values["code"]}
                  onChange={handleChange}
                  intent={errors["code"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tipe"
                labelFor="f-type"
                helperText={errors["type"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-type"
                  name="type"
                  value={values["type"]}
                  onChange={handleChange}
                  intent={errors["type"] ? "danger" : "none"}
                  options={[
                    "Teori",
                    "Praktek",
                    "Teori dan Praktek",
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Sifat Mata Kuliah"
                labelFor="f-subject_trait"
                helperText={errors["subject_trait"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-subject_trait"
                  name="subject_trait"
                  value={values["subject_trait"]}
                  onChange={handleChange}
                  intent={errors["subject_trait"] ? "danger" : "none"}
                  options={[
                    { label: "A - Wajib", value: "A", info: "A" },
                    { label: "B - Pilihan", value: "B", info: "B" },
                    { label: "C - Wajib Permintaan", value: "C", info: "C" },
                    { label: "D - Pilihan Permintaan", value: "D", info: "D" },
                    { label: "S - Tugas Akhir/ Skripsi", value: "S", info: "S" },
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Jurusan"
                labelFor="f-major_id"
                helperText={errors["major_id"]}
                intent={"danger"}
              >
                <Select
                  loading={loading["majors"]}
                  id="f-major_id"
                  name="major_id"
                  value={values["major_id"]}
                  intent={errors["major_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await fetchMajors();
                  }}
                  onChange={async (e) => {
                    await setFieldValue("study_program_id", "", true);
                    await setFieldValue("major_id", e.value, true);
                  }}
                  options={majors}
                />
              </FormGroup>
              <FormGroup
                label="Program Studi"
                labelFor="f-study_program_id"
                helperText={errors["study_program_id"]}
                intent={"danger"}
              >
                <Select
                  loading={loading["studyPrograms"]}
                  disabled={!values["major_id"]}
                  id="f-study_program_id"
                  name="study_program_id"
                  value={values["study_program_id"]}
                  intent={errors["study_program_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await fetchStudyPrograms(values["major_id"])
                  }}
                  onChange={(e) => {
                    setFieldValue("study_program_id", e.value);
                  }}
                  options={studyPrograms}
                />
              </FormGroup>
              <FormGroup
                label="Semester"
                labelFor="f-semester"
                helperText={errors["semester"]}
                intent={"danger"}
              >
                <Select
                  id="f-semester"
                  name="semester"
                  value={values["semester"]}
                  intent={errors["semester"] ? "danger" : "none"}
                  onChange={(e) => {
                    setFieldValue("semester", e.value);
                  }}
                  options={
                    Array(8).fill(0).map((_, i) => {
                      const smstr = i + 1;
                      return (
                        { label: `${smstr}`, value: `${smstr}`, info: smstr % 2 ? "Gasal" : "Genap" }
                      );
                    })
                  }
                />
              </FormGroup>
              <FormGroup
                label="Kurikulum"
                labelFor="f-curriculum_id"
                helperText={errors["curriculum_id"]}
                intent={"danger"}
              >
                <Select
                  id="f-curriculum_id"
                  name="curriculum_id"
                  value={values["curriculum_id"]}
                  intent={errors["curriculum_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await fetchCurriculums();
                  }}
                  onChange={(e) => {
                    setFieldValue("curriculum_id", e.value);
                  }}
                  options={curriculums}
                />
              </FormGroup>

              <h6 className={Classes.HEADING}>Jumlah Satuan Kredit Semester (SKS)</h6>
              <FormGroup
                label="SKS Teori"
                labelFor="f-stheory"
                helperText={errors["stheory"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-stheory"
                  name="stheory"
                  value={values["stheory"]}
                  onChange={handleChange}
                  intent={errors["stheory"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="SKS Praktek"
                labelFor="f-spractice"
                helperText={errors["spractice"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-spractice"
                  name="spractice"
                  value={values["spractice"]}
                  onChange={handleChange}
                  intent={errors["spractice"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="SKS Praktek Lapangan"
                labelFor="f-spractice_field"
                helperText={errors["spractice_field"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-spractice_field"
                  name="spractice_field"
                  value={values["spractice_field"]}
                  onChange={handleChange}
                  intent={errors["spractice_field"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="SKS Total"
                labelFor="f-stotal"
                helperText={errors["stotal"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-stotal"
                  name="stotal"
                  value={values["stotal"]}
                  onChange={handleChange}
                  intent={errors["stotal"] ? "danger" : "none"}
                />
              </FormGroup>
              <Divider />
              <FormGroup
                label="Total Waktu Belajar"
                labelFor="f-total_hours"
                helperText={errors["total_hours"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-total_hours"
                  name="total_hours"
                  value={values["total_hours"]}
                  onChange={handleChange}
                  intent={errors["total_hours"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Nilai Kelulusan"
                labelFor="f-minimum_pass_score"
                helperText={errors["minimum_pass_score"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-minimum_pass_score"
                  name="minimum_pass_score"
                  value={values["minimum_pass_score"]}
                  onChange={handleChange}
                  intent={errors["minimum_pass_score"] ? "danger" : "none"}
                />
              </FormGroup>

              <FormGroup
                label="Rencana Pembelajaran"
                labelFor="f-study_plan"
                helperText={errors["study_plan"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-study_plan"
                  name="study_plan"
                  value={values["study_plan"]}
                  onChange={handleChange}
                  intent={errors["study_plan"] ? "danger" : "none"}
                  options={[
                    "Ada",
                    "Tidak Ada"
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Bahan Ajar"
                labelFor="f-study_matter"
                helperText={errors["study_matter"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-study_matter"
                  name="study_matter"
                  value={values["study_matter"]}
                  onChange={handleChange}
                  intent={errors["study_matter"] ? "danger" : "none"}
                  options={[
                    "Ada",
                    "Tidak Ada"
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Diktat"
                labelFor="f-study_note"
                helperText={errors["study_note"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-study_note"
                  name="study_note"
                  value={values["study_note"]}
                  onChange={handleChange}
                  intent={errors["study_note"] ? "danger" : "none"}
                  options={[
                    "Ada",
                    "Tidak Ada"
                  ]}
                />
              </FormGroup>
              <Divider />
              <h6 className={Classes.HEADING}>Silabus Matakuliah</h6>
              <FormGroup
                label="Akstrak"
                labelFor="f-abstract"
                helperText={errors["abstract"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-abstract"
                  name="abstract"
                  value={values["abstract"]}
                  onChange={handleChange}
                  intent={errors["abstract"] ? "danger" : "none"}
                  options={[
                    "Ada",
                    "Tidak Ada"
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="File Silabus"
                labelFor="f-syllabus_file"
                helperText={errors["syllabus_file"]}
                intent={"danger"}
              >
                <FileInput
                  id="f-syllabus_file"
                  name="syllabus_file"

                  inputProps={{
                    accept: "application/pdf"
                  }}
                  value={values["syllabus_file"]}
                  onChange={(e) => {
                  }}
                  intent={errors["syllabus_file"] ? "danger" : "none"}
                  options={[
                    "Ada",
                    "Tidak Ada"
                  ]}
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

export default DialogMataKuliahBaru;
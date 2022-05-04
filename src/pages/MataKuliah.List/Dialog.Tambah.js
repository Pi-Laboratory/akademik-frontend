import { Button, Classes, Dialog, FileInput, FormGroup, HTMLSelect, InputGroup, Switch, Tag } from "@blueprintjs/core";
import { Box, Divider, Flex, getBase64, Select, useClient } from "components";
import { _base64ToArrayBuffer } from "components/base64ArrayBuffer";
import { SUBJECT_TRAIT, SUBJECT_TYPE } from "components/constants";
import { useTranslations } from "components/useTranslate";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "name": Yup.string().required(),
  "code": Yup.string().required(),
  "stheory": Yup.number().when("type", {
    is: v => ["Teori", "Teori dan Praktek"].indexOf(v) !== -1,
    then: Yup.number().required()
  }),
  "spractice": Yup.number().when("type", {
    is: v => ["Praktek", "Teori dan Praktek"].indexOf(v) !== -1,
    then: Yup.number().required()
  }),
  "spractice_field": Yup.number().when("type", {
    is: v => ["Praktek", "Teori dan Praktek"].indexOf(v) !== -1,
    then: Yup.number().required()
  }),
  "stotal": Yup.number(),
  "total_hours": Yup.number(),
  "type": Yup.string().required(),
  "semester": Yup.number().required(),
  "subject_trait": Yup.string().required(),
  "study_plan": Yup.boolean().required(),
  "study_matter": Yup.boolean().required(),
  "study_note": Yup.boolean().required(),
  "abstract": Yup.boolean(),
  "syllabus_file": Yup.object().shape({
    "value": Yup.string().required(),
    "name": Yup.string().required(),
  }),
  "major_id": Yup.number().required(),
  "study_program_id": Yup.number().required(),
  "curriculum_id": Yup.number().required(),
});

const STotal = (values) => {
  let res = 0;

  try {
    if (["Teori", "Teori dan Praktek"].indexOf(values["type"]) !== -1) {
      res += Number(values["stheory"]);
    }
    if (["Praktek", "Teori dan Praktek"].indexOf(values["type"]) !== -1) {
      res += Number(values["spractice"]);
      res += Number(values["spractice_field"]);
    }
  } catch (err) {
    // Do nothing
  }

  return res;
}

const TotalHours = (values) => {
  const sks = STotal(values);
  let res = 0;
  res = 50 + 60 + 60;
  res = res * sks;
  return res;
}

const DialogMataKuliahBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const t = useTranslations("id");
  const client = useClient();
  const [curriculums, setCurriculums] = useState([]);
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState({
    curriculums: false,
    studyPrograms: false,
    majors: false,
    file: false
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
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Mata Kuliah Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "name": "",
          "code": "",
          "stheory": 0,
          "spractice": 0,
          "spractice_field": 0,
          "stotal": 0,
          "type": "Teori",
          "semester": "",
          "subject_trait": "Wajib",
          "study_plan": false,
          "study_matter": false,
          "study_note": false,
          "abstract": "",
          "syllabus_file": {
            "value": "",
            "name": ""
          },
          "major_id": "",
          "study_program_id": "",
          "curriculum_id": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const result = { ...values };
          result["stotal"] = STotal(values);
          result["total_hours"] = TotalHours(values);
          if (values["syllabus_file"]) {
            result["syllabus_file"] = values["syllabus_file"].value.split(",")[1];
            result["syllabus_file"] = _base64ToArrayBuffer(result["syllabus_file"]);
          } else {
            result["syllabus_file"] = undefined;
          }
          try {
            const res = await client["subjects"].create(result);
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
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                </Box>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                </Box>
              </Flex>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                      options={SUBJECT_TYPE.map((v) => {
                        return {
                          label: t.subject.type[v],
                          value: v,
                        }
                      })}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                      options={SUBJECT_TRAIT.map((v) => {
                        return {
                          label: t.subject.trait[v],
                          value: v,
                        }
                      })}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                </Box>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                </Box>
              </Flex>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                </Box>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                </Box>
              </Flex>
              <h6 className={Classes.HEADING}>Jumlah Satuan Kredit Semester (SKS)</h6>
              {["Teori", "Teori dan Praktek"]
                .indexOf(values["type"]) !== -1 &&
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
                </FormGroup>}
              {["Praktek", "Teori dan Praktek"]
                .indexOf(values["type"]) !== -1 &&
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
                </FormGroup>}
              {["Praktek", "Teori dan Praktek"]
                .indexOf(values["type"]) !== -1 &&
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
                </FormGroup>}
              <FormGroup
                label="SKS Total"
                labelFor="f-stotal"
                helperText={errors["stotal"]}
                intent={"danger"}
              >
                <InputGroup
                  readOnly={true}
                  id="f-stotal"
                  name="stotal"
                  value={STotal(values)}
                  intent={errors["stotal"] ? "danger" : "none"}
                />
              </FormGroup>
              <Divider />
              <FormGroup
                label="Total Waktu Belajar"
                labelFor="f-total_hours"
                helperText={`
                  Tatap Muka: 50mnt;
                  Keg. Akademik: 60mnt;
                  Keg. Mandiri: 60mnt;
                  Per SKS
                `}
                intent={"info"}
              >
                <InputGroup
                  readOnly={true}
                  id="f-total_hours"
                  name="total_hours"
                  value={TotalHours(values)}
                  intent={errors["total_hours"] ? "danger" : "none"}
                  rightElement={<Tag>menit</Tag>}
                />
              </FormGroup>
              <Flex>
                <Box sx={{
                  width: "50%"
                }}>
                  <FormGroup
                    label="Rencana Pembelajaran"
                    labelFor="f-study_plan"
                    helperText={errors["study_plan"]}
                    intent={"danger"}
                  >
                    <Switch
                      id="f-study_plan"
                      name="study_plan"
                      label="Ada"
                      value={values["study_plan"]}
                      onChange={handleChange}
                      intent={errors["study_plan"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{
                  width: "50%"
                }}>
                  <FormGroup
                    label="Bahan Ajar"
                    labelFor="f-study_matter"
                    helperText={errors["study_matter"]}
                    intent={"danger"}
                  >
                    <Switch
                      id="f-study_matter"
                      name="study_matter"
                      label="Ada"
                      value={values["study_matter"]}
                      onChange={handleChange}
                      intent={errors["study_matter"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Diktat"
                labelFor="f-study_note"
                helperText={errors["study_note"]}
                intent={"danger"}
              >
                <Switch
                  id="f-study_note"
                  name="study_note"
                  label="Ada"
                  value={values["study_note"]}
                  onChange={handleChange}
                  intent={errors["study_note"] ? "danger" : "none"}
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
                <Switch
                  id="f-abstract"
                  name="abstract"
                  label="Ada"
                  value={values["abstract"]}
                  onChange={handleChange}
                  intent={errors["abstract"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="File Silabus"
                labelFor="f-syllabus_file"
                helperText={errors["syllabus_file"] && ("File is required")}
                intent={"danger"}
              >
                <FileInput
                  id="f-syllabus_file"
                  name="syllabus_file"
                  inputProps={{
                    accept: "application/pdf"
                  }}
                  hasSelection={!!values["syllabus_file"]}
                  text={loading["file"] ? "Loading" : values["syllabus_file"] ? values["syllabus_file"]["name"] : "Choose file..."}
                  value={values["syllabus_file"]}
                  onChange={async (ev) => {
                    let file = ev.target.files[0];
                    await setFieldValue("syllabus_file", undefined, true);
                    await setLoading(l => ({ ...l, file: true }));
                    if (!file) return;
                    const fileBase64 = await getBase64(file);
                    await setFieldValue("syllabus_file", { value: fileBase64, name: file["name"] }, true);
                    await setLoading(l => ({ ...l, file: false }));
                  }}
                  intent={errors["syllabus_file"] ? "danger" : "none"}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                  minimal={true}
                  intent="danger"
                  text="Close"
                  onClick={() => {
                    onClose();
                  }}
                />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog >
  )
}

export default DialogMataKuliahBaru;
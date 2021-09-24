import { Button, Checkbox, Classes, Dialog, FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { Select, useClient } from "components";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react/cjs/react.development";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nidn": Yup.string().required(),
  "certified": Yup.boolean().required(),
  "study_program_id": Yup.number().required(),
  "employee_id": Yup.number().required(),
  "status": Yup.string().required(),
})

const DialogTambahBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [employees, setEmployees] = useState([]);
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [loading, setLoading] = useState({
    "employees": false,
    "study_programs": false
  });

  const fetchEmployees = useCallback(async (query) => {
    setLoading(loading => ({ ...loading, employees: true }));
    try {
      const res = await client["employees"].find({
        query: {
          $select: ["id", "nip", "name"],
          $limit: 30,
          $or: [{
            name: { $iLike: `%${query}%` }
          }, {
            nip: { $iLike: `%${query}%` }
          }]
        }
      });
      setEmployees(res.data.map((value) => {
        return { label: value["name"], value: value["id"], info: value["nip"] };
      }));
    } catch (err) {
      console.error(err);
    }
    setLoading(loading => ({ ...loading, employees: false }));
  }, [client]);

  const fetchStudyPrograms = useCallback(async (query) => {
    setLoading(loading => ({ ...loading, "study_programs": true }));
    try {
      const res = await client["study-programs"].find({
        query: {
          $select: ["id", "name"],
          $limit: 100,
          $include: [{
            model: "majors",
            $select: ["name"]
          }]
        }
      });
      setStudyPrograms(res.data.map((value) => {
        return { label: value["name"], value: value["id"], info: value["major"]["name"] };
      }));
    } catch (err) {
      console.error(err);
    }
    setLoading(loading => ({ ...loading, "study_programs": false }));
  }, [client]);

  useEffect(() => {
    fetchStudyPrograms();
  }, [fetchStudyPrograms]);

  // console.log(studyPrograms);

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nidn": undefined,
          "certified": false,
          "employee_id": undefined,
          "study_program_id": undefined,
          "status": undefined,
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["lecturers"].create(values);
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
                label="Pegawai"
                labelFor="f-employee_id"
                helperText={errors["employee_id"]}
                intent={"danger"}
              >
                <Select
                  loading={loading["employees"]}
                  id="f-employee_id"
                  name="employee_id"
                  value={values["employee_id"]}
                  intent={errors["employee_id"] ? "danger" : "none"}
                  onChange={async ({ value }) => {
                    await setFieldValue("employee_id", value, true);
                  }}
                  onCreateNew={(query) => fetchEmployees(query)}
                  options={employees}
                />
              </FormGroup>
              <FormGroup
                label="NIDN"
                labelInfo="(Nomor Induk Dosen Nasional)"
                labelFor="f-nidn"
                helperText={errors["nidn"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nidn"
                  name="nidn"
                  value={values["nidn"]}
                  onChange={handleChange}
                  intent={errors["nidn"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Program Studi"
                labelFor="f-study_program_id"
                helperText={errors["study_program_id"]}
                intent={"danger"}
              >
                <Select
                  loading={loading["study_programs"]}
                  id="f-study_program_id"
                  name="study_program_id"
                  value={values["study_program_id"]}
                  intent={errors["study_program_id"] ? "danger" : "none"}
                  onChange={async ({ value }) => {
                    await setFieldValue("study_program_id", value, true);
                  }}
                  options={studyPrograms}
                />
              </FormGroup>
              <FormGroup
                label="Status"
                labelFor="f-status"
                helperText={errors["status"]}
                intent={"danger"}
              >
                <RadioGroup
                  inline={true}
                  id="f-status"
                  name="status"
                  selectedValue={values["status"]}
                  onChange={handleChange}
                  intent={errors["status"] ? "danger" : "none"}
                >
                  {[
                    "Aktif mengajar",
                    "Cuti",
                    "Keluar/Pensiun/Alm",
                    "ALMARHUM",
                    "Studi Lanjut",
                  ].map((v) => <Radio label={v} value={v} />)}
                </RadioGroup>
              </FormGroup>
              <FormGroup
                labelFor="f-certified"
                helperText={errors["certified"]}
                intent={"danger"}
              >
                <Checkbox
                  label="Tersertifikasi"
                  id="f-certified"
                  name="certified"
                  value={values["certified"]}
                  onChange={handleChange}
                  intent={errors["certified"] ? "danger" : "none"}
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

export default DialogTambahBaru;
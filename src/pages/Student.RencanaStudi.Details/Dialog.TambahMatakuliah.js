import { Button, Classes, Dialog, FormGroup } from "@blueprintjs/core";
import { Select, useClient } from "components";
import { Formik } from "formik";
import { useCallback } from "react";
import { useState } from "react/cjs/react.development";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "subject_lecturer_id": Yup.number().required(),
})

const DialogMatakuliah = ({
  data,
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [subjectLecturers, setSubjectLecturers] = useState([]);
  const [loading, setLoading] = useState({
    "subject_lecturers": false
  });

  const fetchSubjectLecturer = useCallback(async (query) => {
    setLoading(loading => ({ ...loading, employees: true }));
    try {
      const res = await client["subject-lecturers"].find({
        query: {
          $select: ["id"],
          // $limit: 30,
          $include: [{
            model: "subjects",
            $select: ["id", "name", "code"],
            $where: {
              $or: [{
                "name": { $iLike: `%${query}%` },
              }, {
                "code": { $iLike: `%${query}%` },
              }],
              "study_program_id": data["study_program_id"]
            },
            $include: [{
              model: "study_programs",
              $select: ["id", "name"]
            }]
          }]
        }
      });
      console.log(res);
      setSubjectLecturers(res.data.map((value) => {
        return { label: value["subject"]["name"], value: value["id"], info: value["subject"]["code"] };
      }));
    } catch (err) {
      console.error(err);
    }
    setLoading(loading => ({ ...loading, employees: false }));
  }, [client, data]);

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Matakuliah"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "subject_lecturer_id": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["study-plans"].create({
              "subject_lecturer_id": values["subject_lecturer_id"],
              "student_id": data["student_id"],
              "study_id": data["study_id"]
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
                label="Jadwal"
                labelFor="f-subject_lecturer_id"
                helperText={errors["subject_lecturer_id"]}
                intent={"danger"}
              >
                <Select
                  loading={loading["subject_lecturers"]}
                  id="f-subject_lecturer_id"
                  name="subject_lecturer_id"
                  value={values["subject_lecturer_id"]}
                  intent={errors["subject_lecturer_id"] ? "danger" : "none"}
                  onChange={async ({ value }) => {
                    await setFieldValue("subject_lecturer_id", value, true);
                  }}
                  onCreateNew={(query) => fetchSubjectLecturer(query)}
                  options={subjectLecturers}
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
    </Dialog>
  )
}

export default DialogMatakuliah;
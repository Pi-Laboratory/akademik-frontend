import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Select, useClient } from "components";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "name": Yup.string().required(),
  "major_id": Yup.number().required(),
  "study_program_id": Yup.number().required(),
})

const DialogKelasBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [majors, setMajors] = useState([]);
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [loading, setLoading] = useState({
    studyPrograms: false,
    majors: false
  });

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
      title="Tambah Kelas Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "name": "",
          "major_id": "",
          "study_program_id": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["classes"].create(values);
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
                label="Nama Kelas"
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
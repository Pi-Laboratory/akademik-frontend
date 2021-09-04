import { Button, Classes, Dialog, FormGroup } from "@blueprintjs/core";
import { Box, CONSTANTS, Flex, Select, useClient } from "components";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "day": Yup.number().required(),
  "subject_id": Yup.number().required(),
  "class_id": Yup.number().required(),
  "hour_id": Yup.number().required(),
  "lecturer_id": Yup.number().required(),
})

const DialogTambah = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [hours, setHours] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState({
    hours: false,
    subjects: false,
    classes: false,
    lecturers: false,
  });

  const fetchHours = useCallback(async () => {
    setLoading(loading => ({ ...loading, hours: true }));
    const res = await client["hours"].find({
      query: {
        $select: ["id", "order", "start", "end"]
      }
    });
    setHours(res.data.map(({ id, order, start, end }) => ({
      label: `${start}-${end}`,
      value: id,
      info: order
    })));
    setLoading(loading => ({ ...loading, hours: false }));
  }, [client]);

  const fetchSubjects = useCallback(async () => {
    setLoading(loading => ({ ...loading, subjects: true }));
    const res = await client["subjects"].find({
      query: {
        $select: ["id", "code", "name"]
      }
    });
    setSubjects(res.data.map(({ id, code, name }) => ({
      label: name,
      value: id,
      info: code
    })));
    setLoading(loading => ({ ...loading, subjects: false }));
  }, [client]);

  const fetchClasses = useCallback(async () => {
    setLoading(loading => ({ ...loading, classes: true }));
    const res = await client["classes"].find({
      query: {
        $select: ["id", "name"],
        $include: [{
          model: "study_programs",
          $select: ["name"]
        }]
      }
    });
    setClasses(res.data.map(({ id, study_program, name }) => ({
      label: name,
      value: id,
      info: study_program["name"]
    })));
    setLoading(loading => ({ ...loading, classes: false }));
  }, [client]);

  const fetchLecturers = useCallback(async () => {
    setLoading(loading => ({ ...loading, lecturers: true }));
    const res = await client["lecturers"].find({
      query: {
        $select: ["id", "name", "nip", "front_degree", "back_degree"]
      }
    });
    console.log(res);
    setLecturers(res.data.map(({ id, nip, name, front_degree, back_degree }) => ({
      label: `${front_degree}${name}${back_degree}`,
      value: id,
      info: nip
    })));
    setLoading(loading => ({ ...loading, lecturers: false }));
  }, [client]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Jadwal Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "day": "",
          "subject_id": "",
          "class_id": "",
          "hour_id": "",
          "lecturer_id": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["schedules"].create(values);
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
                label="Matakuliah"
                labelFor="f-subject_id"
                helperText={errors["subject_id"]}
                intent={"danger"}
              >
                <Select
                  loading={loading["subjects"]}
                  id="f-subject_id"
                  name="subject_id"
                  value={values["subject_id"]}
                  onChange={async ({ value }) => {
                    await setFieldValue("subject_id", value, true);
                  }}
                  intent={errors["subject_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await fetchSubjects();
                  }}
                  options={subjects}
                />
              </FormGroup>
              <Flex sx={{
                mx: -2,
                "> div": {
                  mx: 2,
                }
              }}>
                <Box>
                  <FormGroup
                    label="Hari"
                    labelFor="f-day"
                    helperText={errors["day"]}
                    intent={"danger"}
                  >
                    <Select
                      fill={true}
                      id="f-day"
                      name="day"
                      value={values["day"]}
                      onChange={async ({ value }) => {
                        await setFieldValue("day", value, true);
                      }}
                      intent={errors["day"] ? "danger" : "none"}
                      options={CONSTANTS["DAYS"].map((value, idx) => {
                        return { label: value, value: idx }
                      })}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Jam"
                    labelFor="f-hour_id"
                    helperText={errors["hour_id"]}
                    intent={"danger"}
                  >
                    <Select
                      fill={true}
                      loading={loading["hours"]}
                      id="f-hour_id"
                      name="hour_id"
                      value={values["hour_id"]}
                      onChange={async ({ value }) => {
                        await setFieldValue("hour_id", value, true);
                      }}
                      intent={errors["hour_id"] ? "danger" : "none"}
                      onOpening={async () => {
                        await fetchHours();
                      }}
                      options={hours}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Kelas"
                labelFor="f-class_id"
                helperText={errors["class_id"]}
                intent={"danger"}
              >
                <Select
                  loading={loading["classes"]}
                  id="f-class_id"
                  name="class_id"
                  value={values["class_id"]}
                  onChange={async ({ value }) => {
                    await setFieldValue("class_id", value, true);
                  }}
                  intent={errors["class_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await fetchClasses();
                  }}
                  options={classes}
                />
              </FormGroup>
              <FormGroup
                label="Pengajar"
                labelFor="f-lecturer_id"
                helperText={errors["lecturer_id"]}
                intent={"danger"}
              >
                <Select
                  loading={loading["lecturers"]}
                  id="f-lecturer_id"
                  name="lecturer_id"
                  value={values["lecturer_id"]}
                  onChange={async ({ value }) => {
                    await setFieldValue("lecturer_id", value, true);
                  }}
                  intent={errors["lecturer_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await fetchLecturers();
                  }}
                  options={lecturers}
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
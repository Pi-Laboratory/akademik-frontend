import { Button, Classes, Dialog, FormGroup } from "@blueprintjs/core";
import { TimePicker } from "@blueprintjs/datetime";
import { Box, CONSTANTS, Flex, Select, useClient } from "components";
import { FieldArray, Formik } from "formik";
import moment from "moment";
import { useCallback, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "subject_id": Yup.number().required(),
  "lecturer_id": Yup.number().required(),
  "hours": Yup.array().of(Yup.object().shape({
    "day": Yup.number(),
    "start": Yup.date().default(() => {
      return new Date();
    }),
    "end": Yup.date().default(() => {
      return new Date();
    })
  }))
})

const DialogTambah = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [subjects, setSubjects] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState({
    hours: false,
    subjects: false,
    lecturers: false,
  });

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

  const fetchLecturers = useCallback(async () => {
    setLoading(loading => ({ ...loading, lecturers: true }));
    const res = await client["lecturers"].find({
      query: {
        $select: ["id"],
        $include: [{
          model: "employees",
          $select: ["id", "nip", "name", "front_degree", "back_degree"]
        }]
      }
    });
    setLecturers(res.data.map(({ id, employee: { nip, name, front_degree, back_degree } }) => ({
      label: `${front_degree || ""}${name}${back_degree || ""}`,
      value: id,
      info: nip
    })));
    setLoading(loading => ({ ...loading, lecturers: false }));
  }, [client]);

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Jadwal Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "subject_id": "",
          "lecturer_id": "",
          "hours": [{
            day: null, start: new Date(), end: new Date()
          }]
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            console.log(values);
            const res = await client["subject-lecturers"].create({
              "subject_id": values["subject_id"],
              "lecturer_id": values["lecturer_id"],
              "semester_id": values["semester_id"],
            });
            await Promise.all(values["hours"].map(async (hour) => {
              return await client["hours"].create({
                "day": hour["day"],
                "start": moment(hour["start"]).format("HH:mm"),
                "end": moment(hour["end"]).format("HH:mm"),
                "subject_lecturer_id": res["id"]
              });
            }));
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
              <FieldArray
                name="hours"
                render={arr => (
                  <Box>
                    {values["hours"].map((v, i) => (
                      <Flex
                        key={i}
                        sx={{
                          mx: -2,
                          "> div": { mx: 2, }
                        }}
                      >
                        <Box>
                          <FormGroup
                            label="Hari"
                            labelFor="f-day"
                            helperText={errors["day"]}
                            intent={"danger"}
                            inline={true}
                          >
                            <Select
                              fill={true}
                              id="f-day"
                              name={`hours[${i}]["day"]`}
                              value={v["day"]}
                              onChange={async ({ value }) => {
                                await setFieldValue(`hours[${i}]["day"]`, value, true);
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
                            label="Start"
                            labelFor="f-start"
                            helperText={errors["start"]}
                            intent={"danger"}
                            inline={true}
                          >
                            <TimePicker
                              autoFocus={false}
                              id="f-start"
                              name={`hours[${i}]["start"]`}
                              precision="minutes"
                              value={v["start"]}
                              onChange={async (value) => {
                                await setFieldValue(`hours[${i}]["start"]`, value, true);
                              }}
                              intent={errors["start"] ? "danger" : "none"}
                            />
                          </FormGroup>
                        </Box>
                        <Box>
                          <FormGroup
                            label="End"
                            labelFor="f-end"
                            helperText={errors["end"]}
                            intent={"danger"}
                            inline={true}
                          >
                            <TimePicker
                              fill={true}
                              loading={loading["end"]}
                              id="f-end"
                              name={`hours[${i}]["end"]`}
                              value={v["end"]}
                              onChange={async (value) => {
                                await setFieldValue(`hours[${i}]["end"]`, value, true);
                              }}
                              intent={errors["end"] ? "danger" : "none"}
                            />
                          </FormGroup>
                        </Box>
                        <Box>
                          <Button
                            minimal={true}
                            icon="cross"
                            onClick={() => {
                              arr.remove(i);
                            }}
                          />
                        </Box>
                      </Flex>
                    ))}
                    <Button
                      small={true}
                      minimal={true}
                      text="Tambah waktu"
                      onClick={() => arr.push({
                        day: null, start: new Date(), end: new Date()
                      })}
                    />
                  </Box>
                )}
              />
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
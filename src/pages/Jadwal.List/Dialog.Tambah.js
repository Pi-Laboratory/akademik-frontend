import { Button, Classes, Dialog, FormGroup, InputGroup, Tag } from "@blueprintjs/core";
import { TimePicker } from "@blueprintjs/datetime";
import { Box, CONSTANTS, Flex, Select, useClient } from "components";
import { FieldArray, Formik } from "formik";
import moment from "moment";
import { useCallback, useState } from "react";
import * as Yup from "yup";
import _get from "lodash/get";

const Schema = Yup.object().shape({
  "subject_id": Yup.number().required(),
  "lecturer_id": Yup.number().required(),
  "hours": Yup.array().of(Yup.object().shape({
    "day": Yup.number().typeError('required'),
    "start": Yup.date().default(() => {
      return new Date();
    }),
    "end": Yup.date().default(() => {
      return new Date();
    })
  })),
  "mid_test_weight": Yup.number().required(),
  "final_test_weight": Yup.number().required(),
  "task_weight": Yup.number().required(),
  "presence_weight": Yup.number().required(),
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

  const fetchSubjects = useCallback(async (query) => {
    setLoading(loading => ({ ...loading, subjects: true }));
    const res = await client["subjects"].find({
      query: {
        "name": query ? {
          $iLike: `%${query}%`
        } : undefined,
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

  const fetchLecturers = useCallback(async (query) => {
    setLoading(loading => ({ ...loading, lecturers: true }));
    const res = await client["lecturers"].find({
      query: {
        $limit: 25,
        $select: ["id"],
        $include: [{
          model: "employees",
          $select: ["id", "nip", "name", "front_degree", "back_degree"],
          $where: {
            "name": query ? {
              $iLike: `%${query}%`
            } : undefined,
          }
        }]
      }
    });
    console.log(res);
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
          }],
          "final_test_weight": 40,
          "mid_test_weight": 30,
          "task_weight": 20,
          "presence_weight": 10,
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["subject-lecturers"].create({
              "subject_id": values["subject_id"],
              "lecturer_id": values["lecturer_id"],
              "semester_id": values["semester_id"],
              "mid_test_weight": values["mid_test_weight"],
              "final_test_weight": values["final_test_weight"],
              "task_weight": values["task_weight"],
              "presence_weight": values["presence_weight"]
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
                  onQueryChange={(query) => {
                    fetchSubjects(query);
                  }}
                  intent={errors["subject_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await fetchSubjects("");
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
                  onQueryChange={(query) => {
                    fetchLecturers(query);
                  }}
                  intent={errors["lecturer_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await fetchLecturers("");
                  }}
                  options={lecturers}
                />
              </FormGroup>
              <Box className={Classes.CARD} sx={{ mx: -2, px: 3 }}>
                <Box as="h4" sx={{ mb: 2 }}>Waktu</Box>
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
                              helperText={_get(errors, `["hours"][${i}]["day"]`)}
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
                                intent={_get(errors, `["hours"][${i}]["day"]`) ? "danger" : "none"}
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
                              helperText={_get(errors, `["hours"][${i}]["start"]`)}
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
                                intent={_get(errors, `["hours"][${i}]["start"]`) ? "danger" : "none"}
                              />
                            </FormGroup>
                          </Box>
                          <Box>
                            <FormGroup
                              label="End"
                              labelFor="f-end"
                              helperText={_get(errors, `["hours"][${i}]["end"]`)}
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
                                intent={_get(errors, `["hours"][${i}]["end"]`) ? "danger" : "none"}
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
                        outlined={true}
                        text="Tambah waktu"
                        onClick={() => arr.push({
                          day: null, start: new Date(), end: new Date()
                        })}
                      />
                    </Box>
                  )}
                />
              </Box>
              <h4>Bobot nilai</h4>
              <Flex sx={{ mx: -2, flexWrap: "wrap" }}>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="Kehadiran"
                    labelFor="f-presence_weight"
                    helperText={errors["presence_weight"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-presence_weight"
                      name="presence_weight"
                      value={values["presence_weight"]}
                      onChange={handleChange}
                      intent={errors["presence_weight"] ? "danger" : "none"}
                      rightElement={<Tag minimal={true}>%</Tag>}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="Tugas"
                    labelFor="f-task_weight"
                    helperText={errors["task_weight"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-task_weight"
                      name="task_weight"
                      value={values["task_weight"]}
                      onChange={handleChange}
                      intent={errors["task_weight"] ? "danger" : "none"}
                      rightElement={<Tag minimal={true}>%</Tag>}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="Mid Semester"
                    labelFor="f-mid_test_weight"
                    helperText={errors["mid_test_weight"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-mid_test_weight"
                      name="mid_test_weight"
                      value={values["mid_test_weight"]}
                      onChange={handleChange}
                      intent={errors["mid_test_weight"] ? "danger" : "none"}
                      rightElement={<Tag minimal={true}>%</Tag>}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="Akhir Semester"
                    labelFor="f-final_test_weight"
                    helperText={errors["final_test_weight"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-final_test_weight"
                      name="final_test_weight"
                      value={values["final_test_weight"]}
                      onChange={handleChange}
                      intent={errors["final_test_weight"] ? "danger" : "none"}
                      rightElement={<Tag minimal={true}>%</Tag>}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Total"
                labelFor="f-total_weight"
                helperText={errors["total_weight"]}
                intent={"danger"}
              >
                <InputGroup
                  readOnly={true}
                  id="f-total_weight"
                  name="total_weight"
                  value={(Number(values["final_test_weight"]) + Number(values["mid_test_weight"]) + Number(values["task_weight"]) + Number(values["presence_weight"]))}
                  onChange={handleChange}
                  intent={errors["total_weight"] ? "danger" : "none"}
                  rightElement={<Tag minimal={true}>%</Tag>}
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
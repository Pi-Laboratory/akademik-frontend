import { Button, Classes, Dialog, FormGroup, InputGroup, Tag } from "@blueprintjs/core";
import { TimePicker } from "@blueprintjs/datetime";
import { Box, CONSTANTS, Flex, ListGroup, Select, useClient } from "components";
import { FieldArray, Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import _get from "lodash/get";
import { FetchAndSelect } from "components/FetchAndSelect";

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

  "curriculum_id": Yup.number().required(),
})

const DialogTambah = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();

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
          "subject_id": undefined,
          "lecturer_id": undefined,
          "hours": [{
            day: null, start: new Date(), end: new Date()
          }],
          "final_test_weight": 40,
          "mid_test_weight": 30,
          "task_weight": 20,
          "presence_weight": 10,

          "study_program_id": undefined,
          "curiculum_id": undefined,
          "semester": undefined,
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
                label="Program Studi"
                labelFor="f-study_program_id"
                helperText={errors["study_program_id"]}
                intent={"danger"}
              >
                <FetchAndSelect
                  service={client["study-programs"]}
                  id="f-study_program_id"
                  name="study_program_id"
                  value={values["study_program_id"]}
                  intent={errors["study_program_id"] ? "danger" : "none"}
                  onChange={async ({ value }) => {
                    await setFieldValue("lecturer_id", undefined);
                    await setFieldValue("curriculum_id", undefined);
                    await setFieldValue("subject_id", undefined);
                    await setFieldValue("study_program_id", value);
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      "name": q ? {
                        $iLike: `%${q}%`
                      } : undefined,
                      $select: ["id", "name"],
                      $include: [{
                        model: "majors",
                        $select: ["id", "name"]
                      }]
                    }
                  }}
                  onFetched={(items) => {
                    return items.map((item) => {
                      return {
                        label: item["name"],
                        value: `${item["id"]}`,
                        info: item["major"]["name"]
                      }
                    })
                  }}
                />
              </FormGroup>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="Kurikulum"
                    labelFor="f-curriculum_id"
                    helperText={errors["curriculum_id"]}
                    intent={"danger"}
                  >
                    <FetchAndSelect
                      service={client["curriculums"]}
                      id="f-curriculum_id"
                      name="curriculum_id"
                      value={values["curriculum_id"]}
                      disabled={!values["study_program_id"]}
                      intent={errors["curriculum_id"] ? "danger" : "none"}
                      onChange={async ({ value }) => {
                        await setFieldValue("subject_id", undefined);
                        await setFieldValue("semester", undefined);
                        await setFieldValue("curriculum_id", value);
                      }}
                      onPreFetch={(q, query) => {
                        return {
                          ...query,
                          "name": q ? {
                            $iLike: `%${q}%`
                          } : undefined,
                          "study_program_id": values["study_program_id"],
                          $sort: { year: -1 },
                          $select: ["id", "name", "year"]
                        }
                      }}
                      onFetched={(items) => {
                        return items.map((item) => {
                          return {
                            label: item["name"],
                            value: `${item["id"]}`,
                            info: `${item["year"]}`
                          }
                        })
                      }}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ width: "50%", px: 2 }}>
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
                      disabled={!values["curriculum_id"]}
                      intent={errors["semester"] ? "danger" : "none"}
                      options={new Array(8).fill(0).map((_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                      onChange={async ({ value }) => {
                        await setFieldValue("subject_id", undefined);
                        await setFieldValue("semester", value);
                      }}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Matakuliah"
                labelFor="f-subject_id"
                helperText={errors["subject_id"]}
                intent={"danger"}
              >
                <FetchAndSelect
                  service={client["subjects"]}
                  id="f-subject_id"
                  name="subject_id"
                  value={values["subject_id"]}
                  disabled={!values["semester"]}
                  intent={errors["subject_id"] ? "danger" : "none"}
                  onChange={async ({ value }) => {
                    await setFieldValue("subject_id", value);
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      "name": q ? {
                        $iLike: `%${q}%`
                      } : undefined,
                      "curriculum_id": values["curriculum_id"],
                      "semester": values["semester"],
                      $select: ["id", "name", "code"]
                    }
                  }}
                  onFetched={(items) => {
                    return items.map((item) => {
                      return {
                        label: item["name"],
                        value: `${item["id"]}`,
                        info: `${item["code"]}`
                      }
                    })
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Pengajar"
                labelFor="f-lecturer_id"
                helperText={errors["lecturer_id"]}
                intent={"danger"}
              >
                <FetchAndSelect
                  service={client["lecturers"]}
                  id="f-lecturer_id"
                  name="lecturer_id"
                  value={values["lecturer_id"]}
                  disabled={!values["subject_id"]}
                  intent={errors["lecturer_id"] ? "danger" : "none"}
                  onOpening={async () => {
                    await setFieldValue("lecturer_id", undefined);
                  }}
                  onChange={async ({ value }) => {
                    await setFieldValue("lecturer_id", value);
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      $select: ["id", "nidn"],
                      $include: [{
                        model: "employees",
                        $select: ["id", "name", "front_degree", "back_degree"],
                        $where: {
                          "name": q ? {
                            $iLike: `%${q}%`
                          } : undefined,
                        }
                      }]
                    }
                  }}
                  onFetched={(items) => {
                    return items.map((item) => {
                      return {
                        label: `${item["employee"]["front_degree"] || ""} ${item["employee"]["name"]} ${item["employee"]["back_degree"] || ""}`,
                        value: `${item["id"]}`,
                        info: `${item["nidn"]}`
                      }
                    })
                  }}
                />
              </FormGroup>
              <FieldArray
                name="hours"
                render={arr => (
                  <ListGroup>
                    <ListGroup.Header>
                      <Flex>
                        <Box as="h4" sx={{ flexGrow: 1 }}>Waktu</Box>
                        <Box>
                          <Button
                            small={true}
                            outlined={true}
                            text="Tambah waktu"
                            onClick={() => arr.push({
                              day: null, start: new Date(), end: new Date()
                            })}
                          />
                        </Box>
                      </Flex>
                    </ListGroup.Header>
                    {values["hours"].map((v, i) => (
                      <ListGroup.Item key={i}>
                        <Flex
                          sx={{
                            mx: -2,
                            "> div": { mx: 2, }
                          }}
                        >
                          <Box sx={{ flexGrow: 1 }}>
                            <FormGroup
                              label="Hari"
                              labelFor="f-day"
                              helperText={_get(errors, `["hours"][${i}]["day"]`)}
                              intent={"danger"}
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
                            >
                              <TimePicker
                                fill={true}
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
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              />
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
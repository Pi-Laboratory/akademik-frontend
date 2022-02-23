import { Button, Classes, Dialog, FormGroup, InputGroup, Tag } from "@blueprintjs/core";
import { TimePicker } from "@blueprintjs/datetime";
import { Box, CONSTANTS, Flex, Select, useClient } from "components";
import { FieldArray, Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "hours": Yup.array().of(Yup.object().shape({
    "day": Yup.number(),
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

const DialogEdit = ({
  data,
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
      title="Edit Jadwal"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "subject": data["subject"]["name"],
          "lecturer": data["lecturer"]["employee"]["name"],
          "hours": data["hours"].map((hour) => {
            return {
              ...hour,
              start: moment(hour["start"], "HH:mm:ss").toDate(),
              end: moment(hour["end"], "HH:mm:ss").toDate(),
            }
          }),
          "final_test_weight": data["final_test_weight"],
          "mid_test_weight": data["mid_test_weight"],
          "task_weight": data["task_weight"],
          "presence_weight": data["presence_weight"],
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const initialHoursIds = values["hours"].map(hour => hour["id"]);
            const createdHour = values["hours"].filter(hour => !hour["id"]);
            const deletedHour = data["hours"].filter(hour => {
              if (initialHoursIds.indexOf(hour["id"]) !== -1) return false;
              return true;
            }).map(hour => hour["id"]);
            const editedHour = values["hours"].filter(hour => hour["id"]);

            const res = await client["subject-lecturers"].patch(data["id"], {
              "semester_id": values["semester_id"],
              "mid_test_weight": values["mid_test_weight"],
              "final_test_weight": values["final_test_weight"],
              "task_weight": values["task_weight"],
              "presence_weight": values["presence_weight"]
            });

            await Promise.all(deletedHour.map(async (hourId) => {
              return await client["hours"].delete(hourId);
            }));

            await Promise.all(createdHour.map(async hour => {
              return await client["hours"].create({
                "day": hour["day"],
                "start": moment(hour["start"]).format("HH:mm"),
                "end": moment(hour["end"]).format("HH:mm"),
                "subject_lecturer_id": data["id"]
              })
            }));

            await Promise.all(editedHour.map(async hour => {
              return await client["hours"].patch(hour["id"], {
                "day": hour["day"],
                "start": moment(hour["start"]).format("HH:mm"),
                "end": moment(hour["end"]).format("HH:mm")
              })
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
        {({ values, errors, isSubmitting, dirty, handleSubmit, handleChange, setFieldValue }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup
                label="Matakuliah"
                labelFor="f-subject"
              >
                <InputGroup
                  id={"f-subject"}
                  readOnly={true}
                  defaultValue={values["subject"]}
                />
              </FormGroup>
              <FormGroup
                label="Pengajar"
                labelFor="f-lecturer"
              >
                <InputGroup
                  id={"f-lecturer"}
                  readOnly={true}
                  defaultValue={values["lecturer"]}
                />
              </FormGroup>
              <h4>Jadwal</h4>
              <FieldArray
                name="hours"
                render={arr => (
                  <Box>
                    {values["hours"].map((v, i) => {
                      const error = !!errors["hours"] && !!errors["hours"][i];
                      return (
                        <Flex
                          key={i}
                          sx={{
                            mx: -2,
                            "> div": { mx: 2, }
                          }}
                        >
                          <Box sx={{ width: "30%" }}>
                            <FormGroup
                              label="Hari"
                              labelFor="f-day"
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
                                intent={error ? "danger" : "none"}
                                options={CONSTANTS["DAYS"].map((value, idx) => {
                                  return { label: value, value: idx }
                                })}
                              />
                            </FormGroup>
                          </Box>
                          <Box sx={{ width: "30%" }}>
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
                          <Box sx={{ width: "30%" }}>
                            <FormGroup
                              label="End"
                              labelFor="f-end"
                              helperText={errors["end"]}
                              intent={"danger"}
                              inline={true}
                            >
                              <TimePicker
                                fill={true}
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
                              disabled={values["hours"].length === 1}
                              minimal={true}
                              icon="cross"
                              onClick={() => {
                                arr.remove(i);
                              }}
                            />
                          </Box>
                        </Flex>
                      )
                    })}
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
              <h4>Bobot nilai</h4>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                <Box sx={{ width: "50%", mx: 2 }}>
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
              </Flex>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", mx: 2 }}>
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
                <Box sx={{ width: "50%", mx: 2 }}>
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
                intent={"danger"}
              >
                <InputGroup
                  readOnly={true}
                  id="f-total_weight"
                  name="total_weight"
                  value={(Number(values["final_test_weight"]) + Number(values["mid_test_weight"]) + Number(values["task_weight"]) + Number(values["presence_weight"]))}
                  onChange={handleChange}
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
                  disabled={!dirty}
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

export default DialogEdit;
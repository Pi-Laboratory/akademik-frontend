import { Button, Checkbox, Classes, Dialog, FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, toaster, useClient } from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { FetchAndSelect } from "components/FetchAndSelect";
import { checkUserRole } from "components/helper";

const Schema = Yup.object().shape({
  "username": Yup.string().required(),
  "password": Yup.string(),
  "confirm_password": Yup.string()
    .when("password", {
      is: (password) => !!password,
      then: Yup.string().oneOf([Yup.ref("password"), null], "Password must match")
        .required()
    }),
  "type": Yup.string().oneOf(["admin", "lecturer", "student"]),
  "lecturer_id": Yup.number().when("type", {
    is: "lecturer",
    then: Yup.number().required()
  }),
  "student_id": Yup.number().when("type", {
    is: "student",
    then: Yup.number().required()
  }),
  "show_password": Yup.boolean(),
})

const DialogEdit = ({
  data,
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const defaultValue = useMemo(() => {
    if (!isOpen) return {};
    console.log(data);
    return ({
      id: data["id"],
      username: data["username"],
      type: checkUserRole(data),
      lecturer_id: data["lecturer_id"] || undefined,
      student_id: data["student_id"] || undefined,
    })
  }, [data, isOpen]);

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Edit User"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "username": defaultValue["username"],
          "password": "",
          "confirm_password": "",
          "show_password": false,
          "type": defaultValue["type"],
          "lecturer_id": defaultValue["lecturer_id"],
          "student_id": defaultValue["student_id"],
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          let data = { ...values };
          delete data["show_password"];
          delete data["confirm_password"];
          delete data["type"];
          delete data["lecturer_id"];
          delete data["student_id"];

          if (values.type === "lecturer") data["lecturer_id"] = values["lecturer_id"];
          if (values.type === "student") data["student_id"] = values["student_id"];
          if (values.type === "admin") {
            data["lecturer_id"] = null;
            data["student_id"] = null;
          }

          setErrors({ submit: undefined });
          try {
            const res = await client["users"].patch(defaultValue.id, data);
            toaster.show({
              intent: "success",
              message: "Successful Edit"
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
            <div className={Classes.DIALOG_BODY}><FormGroup
              label="Type"
              labelFor="f-type"
              helperText={errors["type"]}
              intent={"danger"}
            >
              <RadioGroup
                inline={true}
                id="f-type"
                name="type"
                selectedValue={values["type"]}
                onChange={(e) => {
                  handleChange(e);
                }}
                intent={errors["type"] ? "danger" : "none"}
              >
                <Radio label="Admin" value={"admin"} />
                <Radio label="Lecturer" value={"lecturer"} />
                <Radio label="Student" value={"student"} />
              </RadioGroup>
            </FormGroup>
              {values["type"] === "lecturer" &&
                <FormGroup
                  label="Identitas Pengajar"
                  labelFor="f-lecturer_id"
                  helperText={errors["lecturer_id"]}
                  intent={"danger"}
                >
                  <FetchAndSelect
                    service={client["lecturers"]}
                    id="f-lecturer_id"
                    name="lecturer_id"
                    placeholder="Lecturer"
                    value={values["lecturer_id"]}
                    initialValue={values["lecturer_id"]}
                    intent={errors["lecturer_id"] ? "danger" : "none"}
                    onChange={async ({ value, info }) => {
                      await setFieldValue("username", info);
                      await setFieldValue("lecturer_id", value);
                    }}
                    onPreFetch={(q, query) => {
                      return {
                        ...query,
                        $select: ["id", "nidn"],
                        $include: [{
                          model: "employees",
                          $select: ["name", "nip"],
                          $sort: {
                            name: 1
                          },
                          $where: q ? {
                            $or: [{
                              name: { $iLike: `%${q}%` }
                            }, {
                              nip: { $iLike: `%${q}%` }
                            }]
                          } : undefined
                        }]
                      }
                    }}
                    onFetched={(items) =>
                      items.map(({ id, employee }) => {
                        return ({
                          label: employee.name,
                          value: id,
                          info: employee.nip
                        })
                      })}
                  />
                </FormGroup>}
              {values["type"] === "student" &&
                <FormGroup
                  label="Identitas Mahasiswa"
                  labelFor="f-student_id"
                  helperText={errors["student_id"]}
                  intent={"danger"}
                >
                  <FetchAndSelect
                    service={client["students"]}
                    id="f-student_id"
                    name="student_id"
                    value={values["student_id"]}
                    initialValue={values["student_id"]}
                    placeholder="Student"
                    intent={errors["student_id"] ? "danger" : "none"}
                    onChange={async ({ value, info }) => {
                      await setFieldValue("username", info);
                      await setFieldValue("student_id", value);
                    }}
                    onPreFetch={(q, query) => {
                      return {
                        ...query,
                        $select: ["id", "name", "nim"],
                        $sort: {
                          name: 1
                        },
                        $or: q ? [{
                          name: { $iLike: `%${q}%` }
                        }, {
                          nim: { $iLike: `%${q}%` }
                        }] : undefined
                      }
                    }}
                    onFetched={(items) =>
                      items.map(({ id, name, nim }) => ({
                        label: name,
                        value: id,
                        info: nim
                      }))}
                  />
                </FormGroup>}
              <h6 className={Classes.HEADING}>Informasi Pengguna</h6>
              <FormGroup
                label="Username"
                labelFor="f-username"
                helperText={errors["username"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-username"
                  name="username"
                  value={values["username"]}
                  onChange={handleChange}
                  intent={errors["username"] ? "danger" : "none"}
                />
              </FormGroup>
              <Divider />
              <Flex sx={{
                mx: -2,
                "> div": {
                  width: "50%",
                  px: 2,
                  flexGrow: 1,
                }
              }}>
                <Box>
                  <FormGroup
                    label="New Password"
                    labelFor="f-password"
                    helperText={errors["password"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-password"
                      name="password"
                      type={values["show_password"] ? "text" : "password"}
                      value={values["password"]}
                      onChange={handleChange}
                      intent={errors["password"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Confirm Password"
                    labelFor="f-confirm_password"
                    helperText={errors["confirm_password"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-confirm_password"
                      name="confirm_password"
                      disabled={!values["password"]}
                      type={values["show_password"] ? "text" : "password"}
                      value={values["confirm_password"]}
                      onChange={handleChange}
                      intent={errors["confirm_password"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                labelFor="f-show_password"
                helperText={errors["show_password"]}
                intent={"danger"}
              >
                <Checkbox
                  label="Tampilkan Password"
                  id="f-show_password"
                  name="show_password"
                  type="password"
                  value={values["show_password"]}
                  onChange={handleChange}
                  intent={errors["show_password"] ? "danger" : "none"}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                  minimal={true}
                  onClick={() => onClose()}
                  text="Close"
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

export default DialogEdit;
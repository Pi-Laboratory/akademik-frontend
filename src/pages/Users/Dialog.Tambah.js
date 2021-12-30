import { Button, Checkbox, Classes, Dialog, FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { Box, Flex, Select, useClient } from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCallback, useState } from "react";

const Schema = Yup.object().shape({
  "username": Yup.string().required(),
  "password": Yup.string().required(),
  "confirm_password": Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required(),
  "type": Yup.string().oneOf(["admin", "lecture", "student"]),
  "lecturer_id": Yup.number().when("type", {
    is: "lecture",
    then: Yup.number().required()
  }),
  "student_id": Yup.number().when("type", {
    is: "student",
    then: Yup.number().required()
  }),
  "show_password": Yup.boolean(),
})

const DialogTambah = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [loading, setLoading] = useState({
    lecture: false,
    student: false
  })
  const [lecturers, setLecturers] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchLecturers = useCallback(async () => {
    setLoading(loading => ({ ...loading, lecture: true }));
    const res = await client["lecturers"].find({
      query: {
        $select: ["id", "nidn"],
        $include: [{
          model: "employees",
          $select: ["name", "nip"]
        }]
      }
    });
    setLecturers(res.data.map(({ id, employee: { name, nip } }) => ({
      label: name,
      value: id,
      info: nip
    })));
    setLoading(loading => ({ ...loading, lecture: false }));
  }, [client]);

  const fetchStudents = useCallback(async () => {
    setLoading(loading => ({ ...loading, lecture: true }));
    const res = await client["students"].find({
      query: {
        $select: ["id", "name", "nim"]
      }
    });
    setStudents(res.data.map(({ id, name, nim }) => ({
      label: name,
      value: id,
      info: nim
    })));
    setLoading(loading => ({ ...loading, lecture: false }));
  }, [client]);

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah User Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "username": "",
          "password": "",
          "confirm_password": "",
          "show_password": false,
          "type": "admin",
          "lecturer_id": undefined,
          "student_id": undefined,
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          let data = { ...values };
          delete data["show_password"];
          delete data["confirm_password"];
          delete data["type"];
          delete data["lecture_id"];
          delete data["student_id"];

          if (values.type === "lecture") data["lecturer_id"] = values["lecturer_id"];
          if (values.type === "student") data["student_id"] = values["student_id"];
          try {
            const res = await client["users"].create(data);
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
                <Radio label="Lecture" value={"lecture"} />
                <Radio label="Student" value={"student"} />
              </RadioGroup>
            </FormGroup>
              {values["type"] === "lecture" &&
                <FormGroup
                  label="Identitas Pengajar"
                  labelFor="f-lecturer_id"
                  helperText={errors["lecturer_id"]}
                  intent={"danger"}
                >
                  <Select
                    loading={loading["lecture"]}
                    id="f-lecturer_id"
                    name="lecturer_id"
                    value={values["lecturer_id"]}
                    onOpening={async () => { await fetchLecturers(); }}
                    onChange={async ({ value, info }) => {
                      await setFieldValue("username", info);
                      await setFieldValue("lecturer_id", value);
                    }}
                    intent={errors["lecturer_id"] ? "danger" : "none"}
                    options={lecturers}
                  />
                </FormGroup>}
              {values["type"] === "student" &&
                <FormGroup
                  label="Identitas Mahasiswa"
                  labelFor="f-student_id"
                  helperText={errors["student_id"]}
                  intent={"danger"}
                >
                  <Select
                    loading={loading["student"]}
                    id="f-student_id"
                    name="student_id"
                    value={values["student_id"]}
                    onOpening={async () => { await fetchStudents(); }}
                    onChange={async ({ value, info }) => {
                      await setFieldValue("username", info);
                      await setFieldValue("student_id", value);
                    }}
                    intent={errors["student_id"] ? "danger" : "none"}
                    options={students}
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
                    label="Password"
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

export default DialogTambah;
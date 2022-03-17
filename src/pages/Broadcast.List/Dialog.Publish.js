import { Button, Classes, Dialog, FormGroup, HTMLSelect, InputGroup, TextArea } from "@blueprintjs/core";
import { ListGroup, useClient, Box, Flex, Select } from "components";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "title": Yup.string().required(),
  "message": Yup.string().required(),
  "intent": Yup.string().required(),
})

export const DialogPublish = ({
  isOpen,
  data,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data.length === 0) return;
    const fetch = async () => {
      try {
        let res = await client["users"].find({
          query: {
            $select: ["id", "username", "lecturer_id", "student_id", "registration_id"],
            $limit: 3,
            id: { $in: data },
          }
        });
        setItems(res.data.map((item) => {
          item.role = "Admin";
          if (item["lecturer_id"] !== null) {
            item.role = "Dosen";
          }
          if (item["student_id"] !== null) {
            item.role = "Mahasiswa";
          }
          if (item["registration_id"] !== null) {
            item.role = "Public";
          }
          return item;
        }))
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Publish Message"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "title": "",
          "message": "",
          "intent": "none",
          "from_id": client["account"]["id"],
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          let result = data.map((user_id) => ({
            "title": values["title"],
            "message": values["message"],
            "intent": values["intent"],
            "from_id": values["from_id"],
            "to_id": user_id
          }));
          try {
            const res = await client["notifications"].create(result);
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
              <h4>User yang dipilih:</h4>
              <Box sx={{
                mb: 3
              }}>
                <ListGroup>
                  {items.map((item) => (
                    <ListGroup.Item key={item["id"]}>
                      <Flex sx={{
                        "> div": {
                          width: `${100 / 2}%`
                        }
                      }}>
                        <Box>
                          <Box sx={{ color: "gray.5" }}>
                            Username
                          </Box>
                          <Box>
                            {item["username"]}
                          </Box>
                        </Box>
                        <Box>
                          <Box sx={{ color: "gray.5" }}>
                            Role
                          </Box>
                          <Box>
                            {item["role"]}
                          </Box>
                        </Box>
                      </Flex>
                    </ListGroup.Item>))}
                  {data.length > 3 &&
                    <ListGroup.Item>
                      <Flex sx={{
                        justifyContent: "center"
                      }}>
                        <Box>{data.length - 3} more student</Box>
                      </Flex>
                    </ListGroup.Item>}
                </ListGroup>

              </Box>
              <FormGroup
                label="Intent"
                labelFor="f-intent"
                helperText={errors["intent"]}
                intent={errors["intent"] ? "danger" : "none"}
              >
                <HTMLSelect
                  id="f-intent"
                  name="intent"
                  value={values["intent"]}
                  onChange={handleChange}
                  options={[
                    "none",
                    "primary",
                    "success",
                    "danger",
                    "warning",
                  ]}
                  intent={errors["intent"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Title"
                labelFor="f-title"
                helperText={errors["title"]}
                intent={errors["title"] ? "danger" : "none"}
              >
                <InputGroup
                  id="f-title"
                  name="title"
                  value={values["title"]}
                  onChange={handleChange}
                  intent={errors["title"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Message"
                labelFor="f-message"
                helperText={errors["message"]}
                intent={errors["message"] ? "danger" : "none"}
              >
                <TextArea
                  fill={true}
                  id="f-message"
                  name="message"
                  value={values["message"]}
                  growVertically={true}
                  onChange={handleChange}
                  intent={errors["message"] ? "danger" : "none"}
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

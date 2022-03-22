import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useClient, toaster } from "components";
import { Formik } from "formik";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "username": Yup.string().required(),
  "password": Yup.string().required()
});

const Email = ({ onBack = () => { } }) => {
  const client = useClient();
  const history = useHistory();

  const onSubmit = useCallback(async (values, { setSubmitting, setErrors }) => {
    // if (!client.__connected) return;
    try {
      await client.authenticate({
        strategy: "local",
        username: values["username"],
        password: values["password"],
      })
      history.push("/");
    } catch (err) {
      toaster.show({
        intent: "danger",
        message: err.message
      })
      console.error(err);
    }
    setSubmitting(false);
  }, [client, history]);

  return (
    <Box>
      <Formik
        initialValues={{
          "username": "",
          "password": "",
          "keepSignin": true
        }}
        validationSchema={Schema}
        onSubmit={onSubmit}
      >
        {({ values, errors, setFieldValue, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup
              label="Username or Email"
              labelFor="f-username"
              helperText={errors["username"]}
              intent={"danger"}
            >
              <InputGroup
                id="f-username"
                name="username"
                type="text"
                onChange={handleChange}
                value={values["username"]}
                intent={errors["username"] ? "danger" : "none"}
              />
            </FormGroup>
            <FormGroup
              label="Password"
              labelFor="f-password"
              helperText={errors["password"]}
              intent={"danger"}
            >
              <InputGroup
                id="f-password"
                name="password"
                type="password"
                onChange={handleChange}
                value={values["password"]}
                intent={errors["password"] ? "danger" : "none"}
              />
            </FormGroup>
            {/* <Checkbox
      label="Tetap Masuk"
      name="keepSignin"
      checked={values["keepSignin"]}
      onChange={handleChange}
    /> */}
            <Flex>
              <Box>
                <Button
                  onClick={onBack}
                  outlined={true}
                  loading={isSubmitting}
                  text="Kembali"
                />
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <Button
                  fill={true}
                  loading={isSubmitting}
                  intent="primary"
                  text="Masuk"
                  type="submit"
                />
              </Box>
            </Flex>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Email;
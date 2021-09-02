import { Button, FormGroup, H2, InputGroup } from "@blueprintjs/core";
import { Box, useClient } from "components";
import { Formik } from "formik";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "username": Yup.string().required(),
  "password": Yup.string().required()
})

const Login = () => {
  const client = useClient();
  const history = useHistory();

  const onSubmit = useCallback(async (values, { setIsSubmitting, setErrors }) => {
    if (!client.__connected) return;
    try {
      await client.authenticate({
        strategy: "local",
        username: values["username"],
        password: values["password"],
      })
      history.push("/");
    } catch (err) {
      setErrors({
        submit: err.message
      });
      console.error(err);
    }
    setIsSubmitting(false);
    console.log(values);
  }, [client, history]);

  return (
    <Box sx={{
      width: 275,
      mx: "auto",
      mt: 4,
    }}>
      <Box sx={{
        borderRadius: 4,
        border: "1px solid white",
        borderColor: "gray.3",
        py: 4,
        bg: "white"
      }}>
        <Box sx={{ px: 3, mb: 3 }}>
          <H2>
            Login
          </H2>
        </Box>
        <Box sx={{ px: 3 }}>
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
                <Button
                  fill={true}
                  loading={isSubmitting}
                  intent="primary"
                  text="Masuk"
                  type="submit"
                />
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  )
}

export default Login;
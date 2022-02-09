import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, useClient } from "components";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "password": Yup.string().required(),
  "confirm_password": Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required(),
});

export const Detail = () => {
  const client = useClient();
  const history = useHistory();
  const [callout, setCallout] = useState(null);

  const onSubmit = useCallback(async (values, { setErrors, setSubmitting, resetForm }) => {
    const account = client.account;
    try {
      const res = await client.users.patch(account.id, {
        password: values["confirm_password"]
      });
      setCallout({
        intent: "success",
        title: "Berhasil",
        description: "Perubahan password Anda berhasil disimpan.",
      });
      resetForm({
        values: {
          "password": "",
          "confirm_password": ""
        }
      });
      // history.go(0);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Box
      sx={{
        mx: "auto",
        width: 256,
        px: 3,
        pt: 3,
      }}
    >
      {callout &&
        <Box sx={{ mb: 3 }}>
          <Callout intent={callout.intent} title={callout.title}>
            {callout.description}
          </Callout>
        </Box>}
      <Formik
        validationSchema={Schema}
        initialValues={{
          "password": undefined,
          "confirm_password": undefined,
          "password_hide": true,
          "confirm_password_hide": true,
        }}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup
              label="Password"
              labelFor="f-password"
              helperText={errors["password"]}
              intent={"danger"}
            >
              <InputGroup
                id="f-password"
                name="password"
                value={values["password"]}
                onChange={handleChange}
                intent={errors["password"] ? "danger" : "none"}

                type={values["password_hide"] ? "password" : "text"}
                rightElement={<Button
                  minimal={true}
                  icon={values["password_hide"] ? "eye-off" : "eye-open"}
                  onClick={() => {
                    setFieldValue("password_hide", !values["password_hide"]);
                  }}
                />}
              />
            </FormGroup>
            <FormGroup
              label="Confirm Password"
              labelFor="f-confirm_password"
              helperText={errors["confirm_password"]}
              intent={"danger"}
            >
              <InputGroup
                id="f-confirm_password"
                name="confirm_password"
                value={values["confirm_password"]}
                onChange={handleChange}
                type={values["confirm_password_hide"] ? "password" : "text"}
                intent={errors["confirm_password"] ? "danger" : "none"}
                rightElement={<Button
                  minimal={true}
                  icon={values["confirm_password_hide"] ? "eye-off" : "eye-open"}
                  onClick={() => {
                    setFieldValue("confirm_password_hide", !values["confirm_password_hide"]);
                  }}
                />}
              />
            </FormGroup>
            <Box sx={{ mt: 3, textAlign: "right" }}>
              <Button
                text="Simpan"
                type="submit"
                intent="primary"
                loading={isSubmitting}
                disabled={Object.keys(errors).length > 0}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box >
  );
}
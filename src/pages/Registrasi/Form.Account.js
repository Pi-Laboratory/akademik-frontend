import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { useFormikContext } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "username": Yup.string().required(),
  "password": Yup.string().required(),
  "confirm_password": Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required(),
});

export const InitialValues = {
  "username": "",
  "password": "",
  "confirm_password": ""
}

export const FormAccount = ({ goTo = () => { } }) => {

  const {
    values,
    errors,
    handleChange,
    isSubmitting,
    setErrors
  } = useFormikContext();

  return (
    <Box sx={{ py: 3 }}>
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
          value={values["password"]}
          onChange={handleChange}
          intent={errors["password"] ? "danger" : "none"}
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
          type="password"
          value={values["confirm_password"]}
          onChange={handleChange}
          intent={errors["confirm_password"] ? "danger" : "none"}
        />
      </FormGroup>
      <Flex sx={{ mt: 3 }}>
        <Button
          text="Kembali"
          loading={isSubmitting}
          onClick={() => {
            goTo(0);
            setErrors({});
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button text="Simpan" type="submit" intent="primary" loading={isSubmitting} />
      </Flex>
    </Box>
  )
}

export const StepAccount = {
  panel: FormAccount,
  validationSchema: Schema,
  initialValues: InitialValues
}
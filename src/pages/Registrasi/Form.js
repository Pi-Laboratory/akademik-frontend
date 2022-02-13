import { StepBio } from "./Form.Bio";
import { StepAccount } from "./Form.Account";
import { Box, useClient } from "components";
import { useMemo, useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { Position, Toaster } from "@blueprintjs/core";

const Step = [
  {
    id: "bio",
    title: "Bio",
    ...StepBio
  },
  {
    id: "account",
    title: "Account",
    ...StepAccount
  },
]

const toaster = Toaster.create({
  position: Position.TOP
})


export const Form = () => {
  const client = useClient();
  const [step, setStep] = useState(0);
  const history = useHistory();
  const CurrentStep = useMemo(() => {
    return Step[step];
  }, [step]);

  const initialValues = useMemo(() => {
    return Step.reduce((prev, curr) => {
      const ret = {
        ...curr.initialValues,
        ...prev
      };
      return ret;
    }, {})
  }, []);

  return (
    <Formik
      validationSchema={CurrentStep.validationSchema}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          toaster.show({
            intent: "none",
            message: "Sedang menyimpan data"
          });
          const reg = await client.registrations.create({
            "full_name": values["full_name"],
            "address": values["address"],
            "birth_place": values["birth_place"],
            "birth_date": values["birth_date"],
            "phone_number": values["phone_number"],
            "nisn": values["nisn"],
            "school_name": values["school_name"],
            "school_address": values["school_address"],
            "photo": values["photo"]["cropped"]
          });
          const acc = await client.users.create({
            username: values["username"],
            password: values["password"],
            "registration_id": reg["id"]
          });
          console.log(reg, acc);
          toaster.show({
            intent: "success",
            message: "Pendaftaran Berhasil! silahkan login"
          });
          history.push({
            pathname: "/login",
            search: "?from=reg"
          });
        } catch (err) {
          toaster.show({
            intent: "danger",
            message: err.message
          });
          console.error(err);
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit }) =>
        <form onSubmit={handleSubmit}>
          <CurrentStep.panel goTo={setStep} />
        </form>
      }
    </Formik>
  )
}
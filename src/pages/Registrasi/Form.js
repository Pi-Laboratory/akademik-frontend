import { StepBio } from "./Form.Bio";
import { StepAccount } from "./Form.Account";
import { Box, useClient } from "components";
import { useMemo, useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

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
          });
          console.log(reg, acc);
          history.push(`/login?from=reg`);
        } catch (err) {
          console.error(err);
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
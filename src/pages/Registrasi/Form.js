import { StepBio } from "./Form.Bio";
import { StepAccount } from "./Form.Account";
import { StepStudyProgram } from "./Form.StudyProgram";
import { useClient } from "components";
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
    id: "study-programs",
    title: "Study Programs",
    ...StepStudyProgram
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

  const SelectedPanel = CurrentStep.panel;

  return (
    <Formik
      validationSchema={CurrentStep.validationSchema}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          toaster.show({
            icon: "time",
            intent: "none",
            message: "Sedang menyimpan data"
          });
          const reg = await client.registrations.create({
            "name": values["name"],
            "origin_address": values["origin_address"],
            "birth_city": values["birth_city"],
            "birth_date": values["birth_date"],
            "phone_number": values["phone_number"],
            "nisn": values["nisn"],
            "email": values["email"],
            "school_name": values["school_name"],
            "school_address": values["school_address"],
            "photo": values["photo"]["cropped"],
            "gender": values["gender"],
            "study_program_1_id": values["study_program_1_id"],
            "study_program_2_id": values["study_program_2_id"],
          });
          await client.users.create({
            username: values["username"],
            password: values["password"],
            "registration_id": reg["id"]
          });
          toaster.show({
            icon: "tick",
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
          <SelectedPanel goTo={setStep} />
        </form>
      }
    </Formik>
  )
}
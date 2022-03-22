import { StepBio } from "./Form.Bio";
import { StepAccount } from "./Form.Account";
import { StepStudyProgram } from "./Form.StudyProgram";
import { useClient } from "components";
import { useMemo, useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { Position, Toaster } from "@blueprintjs/core";
import { decode } from "base64-arraybuffer";

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
        let reg = null
        try {
          const result = { ...values };
          if (values["photo"].cropped) {
            result["photo"] = values["photo"].cropped.split(",")[1];
            result["photo"] = decode(result["photo"]);
          } else {
            result["photo"] = undefined;
          }
          
          console.log(result, values);
          toaster.show({
            icon: "time",
            intent: "none",
            message: "Sedang menyimpan data"
          });
          reg = await client.registrations.create({
            "name": result["name"],
            "origin_address": result["origin_address"],
            "province_id": result["province_id"],
            "city_id": result["city_id"],
            "district_id": result["district_id"],
            "subdistrict_id": result["subdistrict_id"],
            "neighbor_id": result["neighbor_id"] || undefined,
            "street": result["street"],
            "birth_city": result["birth_city"],
            "birth_date": result["birth_date"],
            "phone_number": result["phone_number"],
            "nisn": result["nisn"],
            "email": result["email"],
            "school_name": result["school_name"],
            "school_address": result["school_address"],
            "photo": result["photo"],
            "gender": result["gender"],
            "study_program_1_id": result["study_program_1_id"],
            "study_program_2_id": result["study_program_2_id"],
          });
          await client.users.create({
            username: result["username"],
            password: result["password"],
            "registration_id": reg["id"],
            "student_id": reg["student"]["id"]
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
          if(reg !== null) {
            await client.registrations.remove(reg["id"]);
          }
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
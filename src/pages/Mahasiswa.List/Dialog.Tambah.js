import { DialogStep, MultistepDialog } from "@blueprintjs/core";
import { useClient } from "components";
import { Formik } from "formik";
import { useMemo, useState } from "react";
import { StepOne } from "./Dialog.Tambah.StepOne";
import { StepTwo } from "./Dialog.Tambah.StepTwo";
import { StepThree } from "./Dialog.Tambah.StepThree";
import { StepFour } from "./Dialog.Tambah.StepFour";

const Step = [
  {
    id: "student",
    title: "Identitas Diri",
    ...StepOne
  },
  {
    id: "father",
    title: "Identitas Ayah",
    ...StepTwo
  },
  {
    id: "mother",
    title: "Identitas Ibu",
    ...StepThree
  },
  {
    id: "trustee",
    title: "Identitas Wali",
    ...StepFour
  },
]

const DialogTambah = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [step, setStep] = useState(0);

  const currentStep = useMemo(() => {
    return Step[step];
  }, [step]);

  return (
    <Formik
      validationSchema={currentStep.validationSchema}
      initialValues={{
        "nim": "",
        "name": "",
        "gender": "",
        "birth_city": "",
        "birth_date": new Date(),
        "religion": "",
        "origin_address": "",
        "recent_address": "",
        "city": "",
        "postal_code": "",
        "phone_number": "",
        "cellular_number": "",
        "email": "",
        "photo": "",
        "generation": "",
        "registration_number": "",
        "registration_date": new Date(),
        "student_status": false,

        "father_name": "",
        "father_birth_date": "",
        "father_status": "",
        "father_death_date": "",
        "father_education": "",
        "father_recent_education": "",
        "father_occupation": "",

        "mother_name": "",
        "mother_birth_date": "",
        "mother_status": "",
        "mother_death_date": "",
        "mother_education": "",
        "mother_recent_education": "",
        "mother_occupation": "",

        "trustee_name": "",
        "trustee_birth_date": "",
        "trustee_status": "",
        "trustee_death_date": "",
        "trustee_education": "",
        "trustee_recent_education": "",
        "trustee_occupation": "",
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        console.log("submit", values);
        // try {
        //   const res = await client["majors"].create({
        //     "name": values["name"]
        //   });
        //   onClose();
        //   onSubmitted(res);
        // } catch (err) {
        //   console.error(err);
        //   setErrors({ submit: err.message });
        //   setSubmitting(false);
        // }
      }}
    >
      {({ submitForm, resetForm }) =>
        <MultistepDialog
          enforceFocus={false}
          isOpen={isOpen}
          onChange={(e) => {
            console.log(e);
          }}
          onClose={() => {
            resetForm();
            onClose();
          }}
          title="Tambah Mahasiswa"
          // usePortal={false}
          finalButtonProps={{
            type: "submit",
            onClick: () => {
              submitForm();
            }
          }}
        >
          {Step.map(({ id, title, panel: Panel }) =>
            <DialogStep key={id} id={id} title={title} panel={<Panel />} />)}
        </MultistepDialog>
      }
    </Formik>
  )
}

export default DialogTambah;
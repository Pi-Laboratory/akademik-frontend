import { DialogStep, MultistepDialog } from "@blueprintjs/core";
import { useClient } from "components";
import { Formik } from "formik";
import { useMemo, useState } from "react";
import { StepOne } from "./Dialog.Tambah.StepOne";
import { StepTwo } from "./Dialog.Tambah.StepTwo";
import { StepThree } from "./Dialog.Tambah.StepThree";
import { StepFour } from "./Dialog.Tambah.StepFour";
import { StepFive } from "./Dialog.Tambah.StepFive";

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
  {
    id: "warp",
    title: "Konfirmasi",
    ...StepFive
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
        "nim": undefined,
        "name": undefined,
        "gender": "",
        "birth_city": undefined,
        "birth_date": undefined,
        "religion": "",
        "origin_address": undefined,
        "recent_address": undefined,
        "city": undefined,
        "postal_code": undefined,
        "phone_number": undefined,
        "email": undefined,
        "photo": undefined,
        "generation": undefined,
        "registration_number": undefined,
        "registration_date": undefined,
        "student_status": "false",

        "father_name": undefined,
        "father_birth_date": undefined,
        "father_status": "true",
        "father_death_date": undefined,
        "father_education": undefined,
        "father_recent_education": undefined,
        "father_occupation": undefined,

        "mother_name": undefined,
        "mother_birth_date": undefined,
        "mother_status": "true",
        "mother_death_date": undefined,
        "mother_education": undefined,
        "mother_recent_education": undefined,
        "mother_occupation": undefined,

        "trustee_name": undefined,
        "trustee_birth_date": undefined,
        "trustee_status": "true",
        "trustee_death_date": undefined,
        "trustee_education": undefined,
        "trustee_recent_education": undefined,
        "trustee_occupation": undefined,
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        console.log("submit", values);
        for (let f of ["father", "mother", "trustee"]) {
          if (!values[`${f}_name`]) {
            delete values[`${f}_name`];
            delete values[`${f}_birth_date`];
            delete values[`${f}_death_date`];
            delete values[`${f}_status`];
            delete values[`${f}_education`];
            delete values[`${f}_recent_education`];
            delete values[`${f}_occupation`];
          }
        }
        console.log("submit filtered", values);
        try {
          const res = await client["students"].create(values);
          console.log(res);
          onClose();
          // onSubmitted(res);
        } catch (err) {
          console.error(err);
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, resetForm, errors, isSubmitting }) =>
        <MultistepDialog
          canEscapeKeyClose={false}
          canOutsideClickClose={false}
          enforceFocus={false}
          isOpen={isOpen}
          onChange={(e, b, c) => {
            const index = Step.findIndex(({ id }) => e === id);
            setStep(index);
          }}
          onClose={() => {
            resetForm();
            onClose();
          }}
          title="Tambah Mahasiswa"
          // usePortal={false}
          finalButtonProps={{
            type: "submit",
            loading: isSubmitting,
            disabled: Object.keys(errors).length > 0,
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
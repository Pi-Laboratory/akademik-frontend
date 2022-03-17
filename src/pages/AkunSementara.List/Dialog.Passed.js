import { Button, Classes, Dialog, FormGroup, InputGroup, RadioGroup } from "@blueprintjs/core"
import { useClient } from "components";
import { Formik } from "formik"
import { useMemo } from "react";
import * as Yup from "yup";

export const DialogPassed = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { },
  data,
  status
}) => {
  const client = useClient();
  const Schema = useMemo(() => (Yup.object().shape({
    'study_program_id': Yup.string().required(),
    'last-word': Yup.string()
      .oneOf(["CONFIRM"], 'Not match')
      .required('Field is required')
  })), []);

  console.log(data);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => onClose()}
      title="Confirm"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "study_program_id": "",
          "last-word": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const res = [];
          console.log(values);
          try {
            res.push(await client["registrations"].patch(data["id"], {
              status: "passed",
              study_program_id: values["study_program_id"]
            }));
            onClose();
            onSubmitted(res);
          } catch (err) {
            console.error(err);
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, isSubmitting, setFieldValue, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup
                label={"Pilihan Program Studi"}
                labelFor={'study_program_id'}
                intent={errors['study_program_id'] ? 'danger' : 'none'}
                helperText={errors['study_program_id']}
              >
                <RadioGroup
                  id={'study_program_id'}
                  onChange={(e) => {
                    setFieldValue("study_program_id", e.target.value);
                  }}
                  selectedValue={values["study_program_id"]}
                  options={[
                    {
                      label: `${data["study_program_1"]["name"]}, ${data["study_program_1"]["major"]["name"]}`,
                      value: `${data["study_program_1"]["id"]}`
                    }, {
                      label: `${data["study_program_2"]["name"]}, ${data["study_program_2"]["major"]["name"]}`,
                      value: `${data["study_program_2"]["id"]}`
                    }
                  ]}
                />
              </FormGroup>
              <h5 className={Classes.HEADING}>mengubah status `{status}` pada data yang dipilih.</h5>
              <p>Anda yakin?</p>
              <FormGroup
                label={(<>Please type <strong>CONFIRM</strong> to confirm</>)}
                labelFor={'last-word'}
                intent={errors['last-word'] ? 'danger' : 'none'}
                helperText={errors['last-word']}
              >
                <InputGroup
                  fill={true}
                  name="last-word"
                  onChange={handleChange}
                  value={values['last-word']}
                  placeholder="type here"
                  intent={errors['last-word'] ? 'danger' : 'none'} />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <Button
                fill={true}
                text="Saya mengerti dan mengubah data ini."
                intent={status === "passed" ? "primary" : "danger"}
                type="submit"
                loading={isSubmitting}
                disabled={Object.entries(errors).length > 0} />
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

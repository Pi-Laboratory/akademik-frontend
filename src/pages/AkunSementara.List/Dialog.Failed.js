import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core"
import { useClient } from "components";
import { Formik } from "formik"
import { useMemo } from "react";
import * as Yup from "yup";

export const DialogFailed = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { },
  data,
  status
}) => {
  const client = useClient();
  const Schema = useMemo(() => (Yup.object().shape({
    'last-word': Yup.string()
      .oneOf(["CONFIRM"], 'Not match')
      .required('Field is required')
  })), []);
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => onClose()}
      title="Confirm"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "last-word": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["registrations"].patch(data.id, {
              status: "failed"
            });
            onClose();
            onSubmitted(res);
          } catch (err) {
            console.error(err);
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <h5 className={Classes.HEADING}>Apakah calon mahasiswa ini Tidak Lulus?</h5>
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
    </Dialog >
  )
}

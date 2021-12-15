import { Button, Classes, Dialog, FileInput, FormGroup, HTMLSelect, InputGroup } from "@blueprintjs/core";
import { Divider, Select, useClient } from "components";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "semester": Yup.number().required(),
})

const DialogRencanaStudiBaru = ({
  data,
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Rencana Studi"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "semester": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["studies"].create({
              "semester": values["semester"],
              "student_id": data["student_id"]
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
        {({ values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup
                label="Semester"
                labelFor="f-semester"
                helperText={errors["semester"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-semester"
                  name="semester"
                  value={values["semester"]}
                  onChange={handleChange}
                  intent={errors["semester"] ? "danger" : "none"}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                  minimal={true}
                  intent="danger"
                  text="Close"
                  onClick={() => {
                    onClose();
                  }}
                />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogRencanaStudiBaru;
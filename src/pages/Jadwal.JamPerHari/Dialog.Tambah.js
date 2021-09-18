import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { TimePicker } from "@blueprintjs/datetime";
import { useClient } from "components";
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "order": Yup.number().required(),
  "start": Yup.string().required(),
  "end": Yup.string().required(),
})

const DialogKelasBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Segment Jam baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "order": "",
          "start": new Date(),
          "end": new Date(),
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const data = {
            "order": values["order"],
            "start": moment(values["start"]).format("HH:mm:ss"),
            "end": moment(values["end"]).format("HH:mm:ss"),
          }
          try {
            const res = await client["hours"].create(data);
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
              {errors && JSON.stringify(errors)}
              <FormGroup
                label="Urutan"
                labelFor="f-order"
                helperText={errors["order"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-order"
                  name="order"
                  value={values["order"]}
                  onChange={handleChange}
                  intent={errors["order"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                inline={true}
                label="Mulai pada pukul"
                labelFor="f-start"
                helperText={errors["start"]}
                intent={"danger"}
              >
                <TimePicker
                  id="f-start"
                  name="start"
                  value={values["start"]}
                  precision="second"
                  inputProps={{
                    intent: errors["start"] ? "danger" : "none"
                  }}
                  onChange={(v) => {
                    setFieldValue("start", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                inline={true}
                label="Berakhir pada pukul"
                labelFor="f-end"
                helperText={errors["end"]}
                intent={"danger"}
              >
                <TimePicker
                  id="f-end"
                  name="end"
                  value={values["end"]}
                  precision="second"
                  inputProps={{
                    intent: errors["end"] ? "danger" : "none"
                  }}
                  onChange={(v) => {
                    setFieldValue("end", v);
                  }}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button minimal={true} intent="danger" text="Close" />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogKelasBaru;
import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { DateInput, TimePicker } from "@blueprintjs/datetime";
import { Select, useClient } from "components";
import { Formik } from "formik";
import moment from "moment";
import { useCallback, useState } from "react";
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
      title="Tambah Kelas Baru"
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
            "start": moment(values["start"]).format("HH:mm"),
            "end": moment(values["end"]).format("HH:mm"),
          }
          console.log(data);
          try {
            const res = await client["hours"].create(data);
            console.log(res);
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
                  fill={true}
                  id="f-start"
                  name="start"
                  value={values["start"]}
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
                  fill={true}
                  id="f-end"
                  name="end"
                  value={values["end"]}
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
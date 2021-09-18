import { Button, Classes, Dialog, FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { useClient } from "components";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "name": Yup.string().required(),
  "code": Yup.string().required(),
  "capacity": Yup.number().min(1).required(),
  "type": Yup.string().oneOf(["Ruangan", "Gedung", "Laboratorium"]).required(),
})

const DialogJadwalBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Ruangan"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "name": "",
          "code": "",
          "capacity": 0,
          "type": "Ruangan"
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["rooms"].create(values);
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
              <FormGroup
                label="Tipe"
                labelFor="f-type"
                helperText={errors["type"]}
                intent={"danger"}
              >
                <RadioGroup
                  inline={true}
                  id="f-type"
                  name="type"
                  selectedValue={values["type"]}
                  onChange={handleChange}
                  intent={errors["type"] ? "danger" : "none"}
                >
                  <Radio label="Ruangan" value={"Ruangan"} />
                  <Radio label="Gedung" value={"Gedung"} />
                  <Radio label="Laboratorium" value={"Laboratorium"} />
                </RadioGroup>
              </FormGroup>
              <FormGroup
                label="Nama"
                labelFor="f-name"
                helperText={errors["name"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-name"
                  name="name"
                  value={values["name"]}
                  onChange={handleChange}
                  intent={errors["name"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Kode"
                labelFor="code"
                helperText={errors["code"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-code"
                  name="code"
                  value={values["code"]}
                  onChange={handleChange}
                  intent={errors["code"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Kapasitas"
                labelFor="capacity"
                helperText={errors["capacity"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-capacity"
                  name="capacity"
                  value={values["capacity"]}
                  onChange={handleChange}
                  intent={errors["capacity"] ? "danger" : "none"}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                  minimal={true}
                  intent="danger"
                  text="Close"
                  onClick={() => onClose()}
                />
                <Button
                  loading={isSubmitting}
                  type="submit"
                  intent="primary"
                  text="Simpan"
                />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogJadwalBaru;
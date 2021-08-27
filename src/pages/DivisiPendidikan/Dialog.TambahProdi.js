import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Select } from "components";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "name": Yup.string().required(),
  "major_id": Yup.string().required(),
})


const DialogTambahBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Prodi"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "name": "",
          "major_id": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>

              <FormGroup
                label="Nama Prodi"
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
                label="Jurusan"
                labelFor="f-major_id"
                helperText={errors["major_id"]}
                intent={"danger"}
              >
                <Select
                  id="f-major_id"
                  name="major_id"
                  value={values["major_id"]}
                  onChange={(e) => {
                    setFieldValue("major_id", e.value);
                  }}
                  intent={errors["major_id"] ? "danger" : "none"}
                  options={[]}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button minimal={true} intent="danger" text="Close" onClick={() => onClose()} />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogTambahBaru;
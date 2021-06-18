import { Button, Classes, Dialog, FormGroup, InputGroup, FileInput, Radio } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nama prodi": Yup.string().required(),
})


const DialogMahasiswaBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Prodi"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nama-prodi": "",
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              
              <FormGroup
                label="Nama Prodi"
                labelFor="f-nama-prodi"
                helperText={errors["nama prodi"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama prodi"
                  name="nama prodi"
                  value={values["nama prodi"]}
                  onChange={handleChange}
                  intent={errors["nama prodi"] ? "danger" : "none"}
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

export default DialogMahasiswaBaru;
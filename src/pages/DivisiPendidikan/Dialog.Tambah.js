import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Select, useClient } from "components";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "name": Yup.string().required(),
  "major_id": Yup.string().required(),
});

const DialogTambahBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [majors, setMajors] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["majors"].find({
          query: {
            $select: ["id", "name"]
          }
        });
        setMajors(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client]);
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
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["study-programs"].create(values);
            onClose();
            console.log(res);
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
                  options={majors.map((major) => (
                    { label: major["name"], value: major["id"] }
                  ))}
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
import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { toaster, useClient } from "components";
import { FetchAndSelect } from "components/FetchAndSelect";
import { Formik } from "formik";
import * as Yup from "yup";
import _get from "lodash/get";
import { useMemo } from "react";

const Schema = Yup.object().shape({
  "name": Yup.string().required(),
  "major_id": Yup.number().required(),
  "study_program_id": Yup.number().required(),
})

const DialogEdit = ({
  data,
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();

  const defaultValue = useMemo(() => {
    if (!isOpen) return {};
    return {
      id: _get(data, "id"),
      name: _get(data, "name"),
      study_program_id: `${_get(data, "study_program_id")}`,
      major_id: `${_get(data, "major_id")}`,
    }
  }, [data, isOpen]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Edit Informasi Kelas"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "name": defaultValue["name"],
          "major_id": defaultValue["major_id"],
          "study_program_id": defaultValue["study_program_id"],
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["classes"].patch(defaultValue["id"], values);
            toaster.show({
              intent: "success",
              message: "Successful Edit"
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
                label="Nama Kelas"
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
                <FetchAndSelect
                  service={client["majors"]}
                  id="f-major_id"
                  name="major_id"
                  initialValue={values["major_id"]}
                  value={values["major_id"]}
                  intent={errors["major_id"] ? "danger" : "none"}
                  onChange={async (e) => {
                    await setFieldValue("study_program_id", undefined);
                    await setFieldValue("major_id", e.value);
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      "name": q ? {
                        $iLike: `%${q}%`
                      } : undefined,
                      $select: ["id", "name"],
                    }
                  }}
                  onFetched={(items) => {
                    return items.map((item) => {
                      return {
                        label: item["name"],
                        value: `${item["id"]}`
                      }
                    })
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Program Studi"
                labelFor="f-study_program_id"
                helperText={errors["study_program_id"]}
                intent={"danger"}
              >
                <FetchAndSelect
                  service={client["study-programs"]}
                  id="f-study_program_id"
                  name="study_program_id"
                  value={values["study_program_id"]}
                  initialValue={values["study_program_id"]}
                  intent={errors["study_program_id"] ? "danger" : "none"}
                  onChange={(e) => {
                    setFieldValue("study_program_id", e.value);
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      "name": q ? {
                        $iLike: `%${q}%`
                      } : undefined,
                      major_id: values["major_id"],
                      $select: ["id", "name"],
                      $include: [{
                        model: "majors",
                        $select: ["id", "name"]
                      }]
                    }
                  }}
                  onFetched={(items) => {
                    return items.map((item) => {
                      return {
                        label: item["name"],
                        value: `${item["id"]}`,
                        info: item["major"]["name"]
                      }
                    })
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

export default DialogEdit;
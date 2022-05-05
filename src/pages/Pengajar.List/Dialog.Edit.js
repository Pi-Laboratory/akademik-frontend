import { Button, Checkbox, Classes, Dialog, FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { toaster, useClient } from "components";
import { FetchAndSelect } from "components/FetchAndSelect";
import { Formik } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";
import _get from "lodash/get";
import { LECTURER_STATUS } from "components/constants";
import { useTranslations } from "components/useTranslate";

const Schema = Yup.object().shape({
  "nidn": Yup.string().required(),
  "certified": Yup.boolean().required(),
  "study_program_id": Yup.number().required(),
  "status": Yup.string().required(),
})

const DialogEdit = ({
  data,
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const t = useTranslations();
  const client = useClient();

  const defaultValue = useMemo(() => {
    if (!isOpen) return {};
    console.log(data);
    return {
      id: _get(data, "id"),
      nidn: _get(data, "nidn"),
      study_program_id: `${_get(data, "study_program.id")}`,
      status: _get(data, "status"),
      certified: _get(data, "certified"),
    }
  }, [data, isOpen]);

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Edit Pengajar"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nidn": defaultValue["nidn"],
          "certified": defaultValue["certified"],
          "study_program_id": defaultValue["study_program_id"],
          "status": defaultValue["status"],
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["lecturers"].patch(defaultValue["id"], values);
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
                label="NIDN"
                labelInfo="(Nomor Induk Dosen Nasional)"
                labelFor="f-nidn"
                helperText={errors["nidn"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nidn"
                  name="nidn"
                  value={values["nidn"]}
                  onChange={handleChange}
                  intent={errors["nidn"] ? "danger" : "none"}
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
                  intent={errors["study_program_id"] ? "danger" : "none"}
                  onChange={async ({ value }) => {
                    await setFieldValue("study_program_id", value, true);
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      "name": q ? {
                        $iLike: `%${q}%`
                      } : undefined,
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
              <FormGroup
                label="Status"
                labelFor="f-status"
                helperText={errors["status"]}
                intent={"danger"}
              >
                <RadioGroup
                  inline={true}
                  id="f-status"
                  name="status"
                  selectedValue={values["status"]}
                  onChange={handleChange}
                  intent={errors["status"] ? "danger" : "none"}
                >
                  {LECTURER_STATUS.map((v) =>
                    <Radio
                      key={v}
                      label={_get(t, `lecturer.status['${v}']`)}
                      value={v}
                    />)}
                </RadioGroup>
              </FormGroup>
              <FormGroup
                labelFor="f-certified"
                helperText={errors["certified"]}
                intent={"danger"}
              >
                <Checkbox
                  label={_get(t, "lecturer.certified['true']")}
                  id="f-certified"
                  name="certified"
                  checked={values["certified"]}
                  onChange={handleChange}
                  intent={errors["certified"] ? "danger" : "none"}
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

export default DialogEdit;
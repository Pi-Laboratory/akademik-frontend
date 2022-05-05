import { Button, Classes, Dialog, FormGroup } from "@blueprintjs/core";
import { useClient, toaster } from "components";
import { FetchAndSelect } from "components/FetchAndSelect";
import { Formik } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";
import _get from "lodash/get";

const Schema = Yup.object().shape({
  "lecturer_id": Yup.string().required(),
})

export const DialogEdit = ({
  isOpen,
  data,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();

  const defaultValue = useMemo(() => {
    if (!isOpen) return {};
    return {
      id: _get(data, "preceptor.id"),
      lecturer_id: `${_get(data, "preceptor.lecturer_id")}`,
      student_id: data["id"],
    }
  }, [data, isOpen]);

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Edit pembimbing"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "lecturer_id": defaultValue["lecturer_id"]
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          let result = {
            "lecturer_id": values["lecturer_id"]
          };
          try {
            const res = await client["preceptors"].patch(defaultValue["id"], result);
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
                label="Dosen"
                labelFor="f-lecturer_id"
                helperText={errors["lecturer_id"]}
                intent={errors["lecturer_id"] ? "danger" : "none"}
              >
                <FetchAndSelect
                  service={client["lecturers"]}
                  id="f-lecturer_id"
                  name="lecturer_id"
                  placeholder="Lecturer"
                  value={values["lecturer_id"]}
                  initialValue={values["lecturer_id"]}
                  intent={errors["lecturer_id"] ? "danger" : "none"}
                  onChange={async ({ value }) => {
                    await setFieldValue("lecturer_id", value);
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      $select: ["id", "nidn"],
                      $include: [{
                        model: "employees",
                        $select: ["name", "nip"],
                        $sort: {
                          name: 1
                        },
                        $where: q ? {
                          $or: [{
                            name: { $iLike: `%${q}%` }
                          }, {
                            nip: { $iLike: `%${q}%` }
                          }]
                        } : undefined
                      }]
                    }
                  }}
                  onFetched={(items) =>
                    items.map(({ id, employee }) => {
                      return ({
                        label: employee.name,
                        value: id,
                        info: employee.nip
                      })
                    })}
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

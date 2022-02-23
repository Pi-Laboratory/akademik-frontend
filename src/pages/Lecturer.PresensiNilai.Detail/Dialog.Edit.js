import { Button, Classes, Dialog, FormGroup, InputGroup, Tag } from "@blueprintjs/core";
import { Box, Flex, toaster, useClient } from "components";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { usePage } from "./hoc";

const Schema = Yup.object().shape({
  "mid_test_weight": Yup.number().required(),
  "final_test_weight": Yup.number().required(),
  "task_weight": Yup.number().required(),
  "presence_weight": Yup.number().required(),
});

const DialogEdit = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { },
}) => {
  const client = useClient();
  const page = usePage();
  const params = useParams();

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Edit Bobot Nilai"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "mid_test_weight": page[0]["mid_test_weight"],
          "final_test_weight": page[0]["final_test_weight"],
          "task_weight": page[0]["task_weight"],
          "presence_weight": page[0]["presence_weight"],
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const total = (Number(values["final_test_weight"]) + Number(values["mid_test_weight"]) + Number(values["task_weight"]) + Number(values["presence_weight"]))
          if (total > 100) {
            setErrors({ "total_weight": "Melewati batas maksimum" });
            setSubmitting(false);
            return false;
          }
          try {
            const res = await client["subject-lecturers"].patch(params["subject_lecturer_id"], {
              "mid_test_weight": values["mid_test_weight"],
              "final_test_weight": values["final_test_weight"],
              "task_weight": values["task_weight"],
              "presence_weight": values["presence_weight"],
            });
            onClose();
            onSubmitted(res);
            toaster.show({
              icon: "tick",
              intent: "success",
              message: "Data berhasil disimpan"
            });
          } catch (err) {
            console.error(err.message);
            toaster.show({
              intent: "danger",
              message: "Gagal menyimpan"
            });
          }
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="Kehadiran"
                    labelFor="f-presence_weight"
                    helperText={errors["presence_weight"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-presence_weight"
                      name="presence_weight"
                      value={values["presence_weight"]}
                      onChange={handleChange}
                      intent={errors["presence_weight"] ? "danger" : "none"}
                      rightElement={<Tag minimal={true}>%</Tag>}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="Tugas"
                    labelFor="f-task_weight"
                    helperText={errors["task_weight"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-task_weight"
                      name="task_weight"
                      value={values["task_weight"]}
                      onChange={handleChange}
                      intent={errors["task_weight"] ? "danger" : "none"}
                      rightElement={<Tag minimal={true}>%</Tag>}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="UTS"
                    labelFor="f-mid_test_weight"
                    helperText={errors["mid_test_weight"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-mid_test_weight"
                      name="mid_test_weight"
                      value={values["mid_test_weight"]}
                      onChange={handleChange}
                      intent={errors["mid_test_weight"] ? "danger" : "none"}
                      rightElement={<Tag minimal={true}>%</Tag>}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ width: "50%", px: 2 }}>
                  <FormGroup
                    label="UAS"
                    labelFor="f-final_test_weight"
                    helperText={errors["final_test_weight"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-final_test_weight"
                      name="final_test_weight"
                      value={values["final_test_weight"]}
                      onChange={handleChange}
                      intent={errors["final_test_weight"] ? "danger" : "none"}
                      rightElement={<Tag minimal={true}>%</Tag>}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Total"
                labelFor="f-total_weight"
                helperText={errors["total_weight"]}
                intent={"danger"}
              >
                <InputGroup
                  readOnly={true}
                  id="f-total_weight"
                  name="total_weight"
                  value={(Number(values["final_test_weight"]) + Number(values["mid_test_weight"]) + Number(values["task_weight"]) + Number(values["presence_weight"]))}
                  onChange={handleChange}
                  intent={errors["total_weight"] ? "danger" : "none"}
                  rightElement={<Tag minimal={true}>%</Tag>}
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
          </form>}
      </Formik>
    </Dialog>
  )
}

export default DialogEdit;
import { Button, Classes, Dialog, FormGroup, HTMLSelect, InputGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box, Flex, useClient } from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

const Schema = Yup.object().shape({
  "year": Yup.string().required(),
  "type": Yup.string().required(),
  "start_date": Yup.string().required(),
  "end_date": Yup.string().required(),
  "start_input_period": Yup.string().required(),
  "end_input_period": Yup.string().required(),
})

const DialogDosenBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Dosen Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          // "year": `${new Date().getFullYear()}/${moment().add(1, "year").format("YYYY")}`,
          "year": new Date().getFullYear(),
          "type": "Gasal",
          "start_date": moment().startOf("month").toDate(),
          "end_date": moment().endOf("month").toDate(),
          "start_input_period": moment().startOf("month").toDate(),
          "end_input_period": moment().endOf("month").toDate(),
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["semesters"].create(values);
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
                label="Tahun Ajaran"
                labelFor="f-year"
                helperText={errors["year"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-year"
                  name="year"
                  value={values["year"]}
                  onChange={handleChange}
                  intent={errors["year"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Jenis"
                labelFor="f-type"
                helperText={errors["type"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-type"
                  name="type"
                  value={values["type"]}
                  onChange={handleChange}
                  intent={errors["type"] ? "danger" : "none"}
                  options={["Gasal", "Genap"]}
                />
              </FormGroup>
              <Flex sx={{
                mx: -2,
                ">div": {
                  width: "50%",
                  flexGrow: 1,
                  px: 2
                }
              }}>
                <Box>
                  <FormGroup
                    label="Waktu Mulai Studi"
                    labelFor="f-start_date"
                    helperText={errors["start_date"]}
                    intent={"danger"}
                  >
                    <DateInput
                      fill={true}
                      id="f-start_date"
                      name="start_date"
                      maxDate={values["end_date"]}
                      value={values["start_date"]}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                      onChange={(v) => {
                        setFieldValue("start_date", v);
                      }}
                      intent={errors["start_date"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Waktu Selesai Studi"
                    labelFor="f-end_date"
                    helperText={errors["end_date"]}
                    intent={"danger"}
                  >
                    <DateInput
                      fill={true}
                      id="f-end_date"
                      name="end_date"
                      minDate={values["start_date"]}
                      value={values["end_date"]}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                      onChange={(v) => {
                        setFieldValue("end_date", v);
                      }}
                      intent={errors["end_date"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <Flex sx={{
                mx: -2,
                ">div": {
                  width: "50%",
                  flexGrow: 1,
                  px: 2
                }
              }}>
                <Box>
                  <FormGroup
                    label="Waktu Mulai Input Nilai"
                    labelFor="f-start_input_period"
                    helperText={errors["start_input_period"]}
                    intent={"danger"}
                  >
                    <DateInput
                      fill={true}
                      id="f-start_input_period"
                      name="start_input_period"
                      maxDate={values["end_input_period"]}
                      value={values["start_input_period"]}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                      onChange={(v) => {
                        setFieldValue("start_input_period", v);
                      }}
                      intent={errors["start_input_period"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Waktu Selesai Input Nilai"
                    labelFor="f-end_input_period"
                    helperText={errors["end_input_period"]}
                    intent={"danger"}
                  >
                    <DateInput
                      fill={true}
                      id="f-end_input_period"
                      name="end_input_period"
                      minDate={values["start_input_period"]}
                      value={values["end_input_period"]}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                      onChange={(v) => {
                        setFieldValue("end_input_period", v);
                      }}
                      intent={errors["end_input_period"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                  minimal={true}
                  intent="danger"
                  text="Close"
                  onClick={() => onClose()}
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

export default DialogDosenBaru;
import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "semester": Yup.string().required(),
  "nama-matakuliah": Yup.string().required(),
  "kelas": Yup.string().required(),
  "ruang": Yup.string().required(),
  "jadwal": Yup.object().shape({
    "created_at": Yup.string().required(),
    "updated_at": Yup.string().required(),
  }),
})

const DialogJadwalBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Jadwal Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "semester": "",
          "nama-matakuliah": "",
          "kelas": "",
          "ruang": "",
          "jadwal": {
            "created_at": "",
            "updated_at": "",
          },
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
            <FormGroup
                label="Semester"
                labelFor="f-semester"
                helperText={errors["semester"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-semester"
                  name="semester"
                  value={values["semester"]}
                  onChange={handleChange}
                  intent={errors["semester"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Nama Matakuliah"
                labelFor="f-nama-matakuliah"
                helperText={errors["nama-matakuliah"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama-matakuliah"
                  name="nama-matakuliah"
                  value={values["nama-matakuliah"]}
                  onChange={handleChange}
                  intent={errors["nama-matakuliah"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Kelas"
                labelFor="f-kelas"
                helperText={errors["kelas"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-kelas"
                  name="kelas"
                  value={values["ipk-min-p"]}
                  onChange={handleChange}
                  intent={errors["ipk-min-p"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Ruang"
                labelFor="f-ruang"
                helperText={errors["ruang"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-ruang"
                  name="ruang"
                  value={values["ruang"]}
                  onChange={handleChange}
                  intent={errors["ruang"] ? "danger" : "none"}
                />
              </FormGroup>
              <h6 className={Classes.HEADING}>Jadwal</h6>
              <Flex sx={{
                mx: -2,
                "> div": {
                  width: `${100 / 2}%`,
                  px: 2
                }
              }}>
                <Box>
                  <FormGroup
                    label="Waktu Mulai"
                    labelFor="f-created_at"
                    helperText={errors["created_at"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-created_at"
                      name="created_at"
                      value={values["created_at"]}
                      onChange={handleChange}
                      intent={errors["created_at"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Waktu Selesai"
                    labelFor="f-updated_at"
                    helperText={errors["updated_at"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-updated_at"
                      name="updated_at"
                      value={values["updated_at"]}
                      onChange={handleChange}
                      intent={errors["updated_at"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
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

export default DialogJadwalBaru;
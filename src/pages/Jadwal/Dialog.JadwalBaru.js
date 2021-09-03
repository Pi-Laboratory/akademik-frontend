import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "ipk-min": Yup.string().required(),
  "nip": Yup.string().required(),
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
          "ipk-min": "",
          "tahun": "",
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
                    labelFor="f-waktu-mulai"
                    helperText={errors["waktu-mulai"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-waktu-mulai"
                      name="waktu-mulai"
                      value={values["waktu-mulai"]}
                      onChange={handleChange}
                      intent={errors["waktu-mulai"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Waktu Selesai"
                    labelFor="f-waktu-max"
                    helperText={errors["waktu-max"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-waktu-max"
                      name="waktu-max"
                      value={values["waktu-max"]}
                      onChange={handleChange}
                      intent={errors["waktu-max"] ? "danger" : "none"}
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
import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex } from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import _get from "lodash/get";

const Schema = Yup.object().shape({
  "nama": Yup.string().required(),
  "tahun": Yup
    .number().typeError(`Harus angka (contoh: ${new Date().getFullYear() - 10})`)
    .min(new Date().getFullYear() - 50)
    .max(new Date().getFullYear() + 50)
    .required(),
  "masa-studi": Yup
    .number().typeError("Harus angka (contoh: 8)")
    .min(0).max(10).required(),
  "masa-studi-max": Yup
    .number().typeError("Harus angka (contoh: 14)")
    .min(0).max(20)
    .required(),
  "keterangan": Yup.string(),
  "keputusan-direktur": Yup.object().shape({
    "nomor": Yup.string().required(),
    "tanggal": Yup.string().required()
  }),
  "waktu-disetujui": Yup.object().shape({
    "pihak-yang-menyetujui": Yup.string().required(),
    "tanggal": Yup.string().required()
  }),
  "max-nilai-d": Yup
    .number().typeError("Harus angka (contoh: 5)")
    .min(0).max(255)
    .required(),
  "ipk-min": Yup
    .number().typeError("Harus angka (contoh: 3.51)")
    .min(0, "Tidak kurang dari 0")
    .max(4, "Tidak lebih dari 4")
    .required(),
  "ipk-min-p": Yup
    .number().typeError("Harus angka (contoh: 3.51)")
    .min(0, "Tidak kurang dari 0")
    .max(4, "Tidak lebih dari 4")
    .required(),
})

const DialogKurikulumBaru = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Kurikulum Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nama": `TL-D4-${new Date().getFullYear()}`,
          "tahun": new Date().getFullYear(),
          "masa-studi": 9,
          "masa-studi-max": 14,
          "keputusan-direktur": {
            "nomor": "",
            "tanggal": "",
          },
          "waktu-disetujui": {
            "pihak-yang-menyetujui": "",
            "tanggal": "",
          },
          "keterangan": "",
          "ipk-min": 1.5,
          "ipk-min-p": 2.65,
          "max-nilai-d": 5,
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <h4 className={Classes.HEADING}>Informasi Kurikulum</h4>
              <FormGroup
                label="Nama Kurikulum"
                labelFor="f-nama"
                helperText={errors["nama"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nama"
                  name="nama"
                  value={values["nama"]}
                  onChange={handleChange}
                  intent={errors["nama"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tahun"
                labelFor="f-tahun"
                helperText={errors["tahun"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-tahun"
                  name="tahun"
                  value={values["tahun"]}
                  onChange={handleChange}
                  intent={errors["tahun"] ? "danger" : "none"}
                />
              </FormGroup>
              <Flex sx={{
                mx: -2,
                "> div": {
                  width: `${100 / 2}%`,
                  px: 2
                }
              }}>
                <Box>
                  <FormGroup
                    label="Masa Studi Ideal"
                    labelFor="f-masa-studi"
                    helperText={errors["masa-studi"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-masa-studi"
                      name="masa-studi"
                      value={values["masa-studi"]}
                      onChange={handleChange}
                      intent={errors["masa-studi"] ? "danger" : "none"}
                      rightElement={<Box sx={{ lineHeight: "30px", px: 2 }}>semester</Box>}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Masa Studi Maximum"
                    labelFor="f-masa-studi-max"
                    helperText={errors["masa-studi-max"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-masa-studi-max"
                      name="masa-studi-max"
                      value={values["masa-studi-max"]}
                      onChange={handleChange}
                      intent={errors["masa-studi-max"] ? "danger" : "none"}
                      rightElement={<Box sx={{ lineHeight: "30px", px: 2 }}>semester</Box>}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Catatan"
                labelInfo="(opsional)"
                labelFor="f-keterangan"
                helperText={errors["keterangan"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-keterangan"
                  name="keterangan"
                  value={values["keterangan"]}
                  onChange={handleChange}
                  intent={errors["keterangan"] ? "danger" : "none"}
                />
              </FormGroup>

              <h5 className={Classes.HEADING}>Keputusan Direktur</h5>
              <FormGroup
                label="Nomor"
                labelFor="f-keputusan-direktur.nomor"
                helperText={_get(errors, "keputusan-direktur.nomor")}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-keputusan-direktur.nomor"
                  name="keputusan-direktur.nomor"
                  value={_get(values, "keputusan-direktur.nomor")}
                  onChange={handleChange}
                  intent={_get(errors, "keputusan-direktur.nomor") ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal"
                labelFor="f-keputusan-direktur.tanggal"
                helperText={_get(errors, "keputusan-direktur.tanggal")}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-keputusan-direktur.tanggal"
                  name="keputusan-direktur.tanggal"
                  value={_get(values, "keputusan-direktur.tanggal")}
                  onChange={handleChange}
                  intent={_get(errors, "keputusan-direktur.tanggal") ? "danger" : "none"}
                />
              </FormGroup>

              <h5 className={Classes.HEADING}>Waktu disetujui</h5>
              <FormGroup
                label="Pihak yang menyetujui"
                labelFor="f-waktu-disetujui.pihak-yang-menyetujui"
                helperText={_get(errors, "waktu-disetujui.pihak-yang-menyetujui")}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-waktu-disetujui.pihak-yang-menyetujui"
                  name="waktu-disetujui.pihak-yang-menyetujui"
                  value={_get(values, "waktu-disetujui.pihak-yang-menyetujui")}
                  onChange={handleChange}
                  intent={_get(errors, "waktu-disetujui.pihak-yang-menyetujui") ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal"
                labelFor="f-waktu-disetujui.tanggal"
                helperText={_get(errors, "waktu-disetujui.tanggal")}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-waktu-disetujui.tanggal"
                  name="waktu-disetujui.tanggal"
                  value={_get(values, "waktu-disetujui.tanggal")}
                  onChange={handleChange}
                  intent={_get(errors, "waktu-disetujui.tanggal") ? "danger" : "none"}
                />
              </FormGroup>


              <Divider />
              <h4 className={Classes.HEADING}>Evaluasi per Semester</h4>
              <Flex sx={{
                mx: -2,
                "> div": {
                  width: `${100 / 2}%`,
                  px: 2
                }
              }}>
                <Box>
                  <FormGroup
                    label="IPK Min"
                    labelFor="f-ipk-min"
                    helperText={errors["ipk-min"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-ipk-min"
                      name="ipk-min"
                      value={values["ipk-min"]}
                      onChange={handleChange}
                      intent={errors["ipk-min"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="IPK Min Percobaan"
                    labelFor="f-ipk-min-p"
                    helperText={errors["ipk-min-p"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-ipk-min-p"
                      name="ipk-min-p"
                      value={values["ipk-min-p"]}
                      onChange={handleChange}
                      intent={errors["ipk-min-p"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Jumlah maximum nilai D"
                labelFor="f-max-nilai-d"
                helperText={errors["max-nilai-d"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-max-nilai-d"
                  name="max-nilai-d"
                  value={values["max-nilai-d"]}
                  onChange={handleChange}
                  intent={errors["max-nilai-d"] ? "danger" : "none"}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button minimal={true} onClick={() => onClose()} text="Close" />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogKurikulumBaru;
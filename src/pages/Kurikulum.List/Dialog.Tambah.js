import { Button, Classes, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, Select, useClient } from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import _get from "lodash/get";
import { useCallback, useEffect, useState } from "react";
import { DateInput } from "@blueprintjs/datetime";
import moment from "moment";

const Schema = Yup.object().shape({
  "study_program_id": Yup.number().required(),
  "name": Yup.string().required(),
  "year": Yup
    .number().typeError(`Harus angka (contoh: ${new Date().getFullYear() - 10})`)
    .min(new Date().getFullYear() - 50)
    .max(new Date().getFullYear() + 50)
    .required(),
  "ideal_study_period": Yup
    .number().typeError("Harus angka (contoh: 8)")
    .min(0).max(20).required(),
  "maximum_study_period": Yup
    .number().typeError("Harus angka (contoh: 14)")
    .min(0).max(20)
    .required(),
  "description": Yup.string(),
  "publish_date": Yup.string().required(),
  "approving_party": Yup.string().required(),
  "approving_date": Yup.string().required(),
  "maximum_d_score": Yup
    .number().typeError("Harus angka (contoh: 5)")
    .min(0).max(255)
    .required(),
  "minimal_score": Yup
    .number().typeError("Harus angka (contoh: 3.51)")
    .min(0, "Tidak kurang dari 0")
    .max(4, "Tidak lebih dari 4")
    .required()
})

const DialogKurikulumBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [loading, setLoading] = useState({
    studyPrograms: false
  })
  const [studyPrograms, setStudyPrograms] = useState([]);

  const fetchStudyPrograms = useCallback(async (query) => {
    setLoading(true);
    try {
      const res = await client["study-programs"].find({
        query: {
          "name": query ? {
            $iLike: `%${query}%`
          } : undefined,
          $limit: 100,
          $select: ["id", "name"],
          $include: [{
            model: "majors",
            $select: ["id", "name"]
          }]
        }
      });
      await setStudyPrograms(res.data.map(({ id, name, major }) => ({
        label: name,
        value: id,
        info: major["name"]
      })));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [client]);

  useEffect(() => {
    fetchStudyPrograms("");
  }, [client]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Kurikulum Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "name": "",
          "year": new Date().getFullYear(),
          "publish_date": new Date(),
          "approving_party": "",
          "approving_date": new Date(),
          "ideal_study_period": "",
          "maximum_study_period": "",
          "description": "",
          "minimal_score": "",
          "maximum_d_score": "",
          "study_program_id": "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await client["curriculums"].create(values);
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
              <h4 className={Classes.HEADING}>Informasi Kurikulum</h4>
              <FormGroup
                label="Program Studi"
                labelFor="f-study_program_id"
                helperText={errors["study_program_id"]}
                intent={"danger"}
              >
                <Select
                  id="f-study_program_id"
                  name="study_program_id"
                  value={values["study_program_id"]}
                  loading={loading}
                  onChange={async ({ value, label }) => {
                    if (values["name"] === "") {
                      const Abb = label.split(" ").map((word) => word[0]).join("");
                      await setFieldValue("name", `${Abb}-${new Date().getFullYear()}`);
                    }
                    await setFieldValue("study_program_id", value);
                  }}
                  onQueryChange={(query) => {
                    fetchStudyPrograms(query);
                  }}
                  intent={errors["study_program_id"] ? "danger" : "none"}
                  options={studyPrograms}
                />
              </FormGroup>
              <FormGroup
                label="Nama Kurikulum"
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
                label="Tahun"
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
                    labelFor="f-ideal_study_period"
                    helperText={errors["ideal_study_period"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-ideal_study_period"
                      name="ideal_study_period"
                      value={values["ideal_study_period"]}
                      onChange={handleChange}
                      intent={errors["ideal_study_period"] ? "danger" : "none"}
                      rightElement={<Box sx={{ lineHeight: "30px", px: 2 }}>semester</Box>}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Masa Studi Maximum"
                    labelFor="f-maximum_study_period"
                    helperText={errors["maximum_study_period"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-maximum_study_period"
                      name="maximum_study_period"
                      value={values["maximum_study_period"]}
                      onChange={handleChange}
                      intent={errors["maximum_study_period"] ? "danger" : "none"}
                      rightElement={<Box sx={{ lineHeight: "30px", px: 2 }}>semester</Box>}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Catatan"
                labelInfo="(opsional)"
                labelFor="f-description"
                helperText={errors["description"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-description"
                  name="description"
                  value={values["description"]}
                  onChange={handleChange}
                  intent={errors["description"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal Keputusan"
                labelFor="f-publish_date"
                helperText={_get(errors, "publish_date")}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-publish_date"
                  name="publish_date"
                  value={values["publish_date"]}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("publish_date", v);
                  }}
                  intent={_get(errors, "publish_date") ? "danger" : "none"}
                />
              </FormGroup>
              <h5 className={Classes.HEADING}>Waktu disetujui</h5>
              <FormGroup
                label="Pihak yang menyetujui"
                labelFor="f-approving_party"
                helperText={_get(errors, "approving_party")}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-approving_party"
                  name="approving_party"
                  value={values["approving_party"]}
                  onChange={handleChange}
                  intent={_get(errors, "approving_party") ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal"
                labelFor="f-approving_date"
                helperText={_get(errors, "approving_date")}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-approving_date"
                  name="approving_date"
                  value={values["approving_date"]}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("approving_date", v);
                  }}
                  intent={_get(errors, "approving_date") ? "danger" : "none"}
                />
              </FormGroup>
              <Divider />
              <h4 className={Classes.HEADING}>Evaluasi per Semester</h4>
              <FormGroup
                label="Minimal Indeks Prestasi Kumulatif (IPK)"
                labelFor="f-minimal_score"
                helperText={errors["minimal_score"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-minimal_score"
                  name="minimal_score"
                  value={values["minimal_score"]}
                  onChange={handleChange}
                  intent={errors["minimal_score"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Jumlah maximum nilai D"
                labelFor="f-maximum_d_score"
                helperText={errors["maximum_d_score"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-maximum_d_score"
                  name="maximum_d_score"
                  value={values["maximum_d_score"]}
                  onChange={handleChange}
                  intent={errors["maximum_d_score"] ? "danger" : "none"}
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
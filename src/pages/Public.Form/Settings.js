import { H2, H3, Button, Classes, Menu, MenuItem, FormGroup, InputGroup, Spinner, TextArea } from "@blueprintjs/core";
import { Box, CropImage, Divider, Select, getBase64, TakePhoto, useClient, AspectRatio, toaster } from "components";
import { Popover2 } from "@blueprintjs/popover2";
import * as Yup from "yup";
import { Formik } from "formik";
import { Helmet } from "react-helmet";
import { useStudent } from ".";
import { useState, useCallback } from "react";
import { DateInput } from "@blueprintjs/datetime";
import moment from "moment";
import { decode } from "base64-arraybuffer";

const Schema = {
  general: Yup.object().shape({
    "name": Yup.string().required(),
    "email": Yup.string().required(),
    "origin_address": Yup.string().required(),
    "birth_city": Yup.string().required(),
    "birth_date": Yup.date().required(),
    "phone_number": Yup.string().required(),
    "photo": Yup.object().shape({
      "value": Yup.string().required(),
      "name": Yup.string().required(),
      "cropped": Yup.string(),
    }),
  }),
  basedSchool: Yup.object().shape({
    "nisn": Yup.string().required(),
    "school_name": Yup.string().required(),
    "school_address": Yup.string().required(),
    "study_program_1_id": Yup.string()
      .notOneOf([Yup.ref("study_program_2_id")], "Program Studi harus berbeda")
      .required(),
    "study_program_2_id": Yup.string()
      .notOneOf([Yup.ref("study_program_1_id")], "Program Studi harus berbeda")
      .required(),
  })
}

export const Settings = ({ base }) => {
  const client = useClient();
  const student = useStudent();

  const [studyPrograms, setStudyPrograms] = useState({
    "study_program_1": [],
    "study_program_2": []
  });

  const [photoPopover, setPhotoPopover] = useState(false);

  const [loading, setLoading] = useState({
    "file": false,
    "study_program_1": false,
    "study_program_2": false
  });

  const fetchStudyPrograms = useCallback(async (key) => {
    setLoading(l => ({ ...l, [key]: true }));
    try {
      const res = await client["study-programs"].find({
        query: {
          $select: ["id", "name"],
          $include: [{
            model: "majors",
            $select: ["name"]
          }]
        }
      });
      setStudyPrograms(sp => ({
        ...sp,
        [key]: res.data.map(({ id, name, major }) => {
          return {
            label: name,
            value: id,
            info: major["name"]
          }
        })
      }));
    } catch (err) {
      console.error(err);
    }
    setLoading(l => ({ ...l, [key]: false }));
  }, [client]);

  if (student === null) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <Helmet>
        <title>Setting - Pendaftaran Calon Mahasiswa Baru</title>
      </Helmet>
      <Box sx={{ mx: 3 }}>
        <Box as={H2} sx={{ mb: 2 }}>Edit Informasi</Box>
        <Divider sx={{ mb: 4 }} />
        <Box as={H3} sx={{ mb: 3 }}>Informasi Umum</Box>
        <Box className={Classes.CARD} sx={{ mb: 4 }}>
          <Formik
            validationSchema={Schema.general}
            initialValues={{
              "photo": {
                "cropped": ""
              },
              "name": student["student"]["name"],
              "email": student["student"]["email"],
              "origin_address": student["student"]["origin_address"],
              "birth_city": student["student"]["birth_city"],
              "birth_date": student["student"]["birth_date"] && new Date(student["student"]["birth_date"]),
              "phone_number": student["student"]["phone_number"]
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const result = { ...values };
                if (values["photo"].cropped) {
                  result["photo"] = values["photo"].cropped.split(",")[1];
                  result["photo"] = decode(result["photo"]);
                } else {
                  result["photo"] = undefined;
                }
                await client["students"].patch(student["student"]["id"], result);
                toaster.show({
                  intent: "success",
                  message: "Berhasil disimpan"
                });
              } catch (err) {
                console.error(err);
              }
              setSubmitting(false);
            }}
          >
            {({ setFieldValue, handleChange, handleSubmit, resetForm, values, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <FormGroup
                    label="Foto"
                    labelFor="f-photo"
                    helperText={errors["photo"] && (
                      errors["photo"]["cropped"] ?
                        `photo must cropped` :
                        "photo is required"
                    )}
                    intent={"danger"}
                  >
                    <Box className={`${Classes.CARD}`} sx={{ maxWidth: 164, bg: "gray.1", p: 0, borderRadius: 4, overflow: "hidden" }}>
                      <AspectRatio ratio="3:4">
                        <Box
                          sx={{ width: "100%", height: "100%" }}
                        >
                          {(values["photo"] && (values["photo"]["cropped"] || values["photo"]["value"])) &&
                            <Box
                              as="img"
                              sx={{ width: "100%", height: "100%", display: "block", borderRadius: 4 }}
                              src={values["photo"]["cropped"] || values["photo"]["value"]}
                            />}
                          {!(values["photo"] && (values["photo"]["cropped"] || values["photo"]["value"])) &&
                            <Box
                              sx={{
                                width: "100%",
                                height: "100%",
                                display: "block",
                                objectFit: "cover",
                              }}
                              as="img"
                              src={`${client.host.toString()}files/students/${student["student"]["id"]}/photo.jpg`}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "https://via.placeholder.com/135x180?text=Tidak ditemukan";
                              }}
                            />}
                        </Box>
                        <Box sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0
                        }}>
                          <Box sx={{
                            position: "absolute",
                            bg: "white",
                            inset: 0,
                            borderRadius: "0 0 4px 4px",
                          }} />
                          <Box sx={{
                            position: "relative"
                          }}>
                            <Popover2
                              minimal={true}
                              fill={true}
                              position="bottom"
                              isOpen={photoPopover}
                              content={
                                <Menu>
                                  <MenuItem
                                    tagName="label"
                                    htmlFor="f-photo"
                                    text={loading["file"] ? "Loading" : "Upload photo"}
                                    icon="blank"
                                  />
                                  <input
                                    hidden={true}
                                    id="f-photo"
                                    name="photo"
                                    type="file"
                                    accept="image/jpeg"
                                    onChange={async (ev) => {
                                      let file = ev.target.files[0];
                                      await setFieldValue("photo", undefined, true);
                                      await setLoading(l => ({ ...l, file: true }));
                                      const fileBase64 = await getBase64(file);
                                      await setFieldValue("photo", { value: fileBase64, name: file["name"], cropped: null }, true);
                                      await setLoading(l => ({ ...l, file: false }));
                                    }}
                                  />
                                  <TakePhoto
                                    text="Take photo"
                                    icon="camera"
                                    ButtonComponent={MenuItem}
                                    buttonProps={{
                                      tagName: "button",
                                    }}
                                    onCapture={async (value) => {
                                      await setFieldValue("photo", {
                                        name: "Webcam Capture",
                                        value: value,
                                        cropped: null,
                                      }, true);
                                    }}
                                  />
                                  <CropImage
                                    text="Crop photo"
                                    icon="mugshot"
                                    ButtonComponent={MenuItem}
                                    buttonProps={{
                                      disabled: !values["photo"]["value"],
                                      tagName: "button",
                                    }}
                                    ratio={3 / 4}
                                    onCropped={(value) => {
                                      setFieldValue("photo", {
                                        ...values["photo"],
                                        cropped: value,
                                      }, true);
                                    }}
                                    src={values["photo"] && values["photo"]["value"]}
                                    disabled={!values["photo"]}
                                  />
                                </Menu>
                              }
                            >
                              <Button
                                fill={true}
                                text="Change Photo"
                                minimal={true}
                                onClick={() => {
                                  setPhotoPopover(v => !v);
                                }}
                              />
                            </Popover2>
                          </Box>
                        </Box>
                      </AspectRatio>
                    </Box>
                  </FormGroup>
                  <Box as="p" sx={{ fontSize: 0, mb: 3 }}>Ukuran foto 3x4.Foto Bebas Rapih.Latar Belakang Polos</Box>
                  <FormGroup
                    label="Nama Lengkap"
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
                      fill={true}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Email"
                    labelFor="f-email"
                    helperText={errors["email"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-email"
                      name="email"
                      value={values["email"]}
                      onChange={handleChange}
                      intent={errors["email"] ? "danger" : "none"}
                      fill={true}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Alamat"
                    labelFor="f-origin_address"
                    helperText={errors["origin_address"]}
                    intent={"danger"}
                  >
                    <TextArea
                      fill={true}
                      growVertically={true}
                      id="f-origin_address"
                      name="origin_address"
                      placeholder="contoh: Buha, Kec. Mapanget, Kota Manado, Sulawesi Utara, Indonesia"
                      value={values["origin_address"]}
                      onChange={handleChange}
                      intent={errors["origin_address"] ? "danger" : "none"}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Tempat Lahir"
                    labelFor="f-birth_city"
                    helperText={errors["birth_city"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-birth_city"
                      name="birth_city"
                      value={values["birth_city"]}
                      onChange={handleChange}
                      intent={errors["birth_city"] ? "danger" : "none"}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Tanggal Lahir"
                    labelFor="f-birth_date"
                    helperText={errors["birth_date"]}
                    intent={"danger"}
                  >
                    <DateInput
                      fill={true}
                      id="f-birth_date"
                      name="birth_date"
                      value={values["birth_date"]}
                      minDate={moment().subtract(50, "year").toDate()}
                      inputProps={{
                        intent: errors["birth_date"] ? "danger" : "none"
                      }}
                      onChange={(v) => {
                        setFieldValue("birth_date", v);
                      }}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Nomor Telephone"
                    labelFor="f-phone_number"
                    helperText={errors["phone_number"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-phone_number"
                      name="phone_number"
                      placeholder="contoh: 085212345678"
                      value={values["phone_number"]}
                      onChange={handleChange}
                      intent={errors["phone_number"] ? "danger" : "none"}
                    />
                  </FormGroup>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      text="Simpan information umum"
                      type="submit"
                      intent="primary"
                      loading={isSubmitting}
                    />
                    <Button
                      minimal={true}
                      type="reset"
                      text="Reset"
                      loading={isSubmitting}
                      onClick={() => {
                        resetForm();
                      }}
                    />
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        <Box as={H3} sx={{ mb: 3 }}>Informasi Pendaftaran</Box>
        <Box className={Classes.CARD} sx={{ mb: 4 }}>
          <Formik
            validationSchema={Schema.basedSchool}
            initialValues={{
              "nisn": student["nisn"],
              "school_name": student["school_name"],
              "school_address": student["school_address"],
              "study_program_1_id": student["study_program_1_id"],
              "study_program_2_id": student["study_program_2_id"],
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const result = { ...values };
                await client["registrations"].patch(student["id"], result);
                toaster.show({
                  intent: "success",
                  message: "Berhasil disimpan"
                });
              } catch (err) {
                console.error(err);
              }
              setSubmitting(false);
            }}
          >
            {({ setFieldValue, handleChange, handleSubmit, resetForm, values, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <FormGroup
                    label="Nomor Induk Siswa Nasional"
                    labelFor="f-nisn"
                    helperText={errors["nisn"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-nisn"
                      name="nisn"
                      value={values["nisn"]}
                      onChange={handleChange}
                      intent={errors["nisn"] ? "danger" : "none"}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Asal Sekolah"
                    labelFor="f-school_name"
                    helperText={errors["school_name"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-school_name"
                      name="school_name"
                      value={values["school_name"]}
                      onChange={handleChange}
                      intent={errors["school_name"] ? "danger" : "none"}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Alamat Sekolah"
                    labelFor="f-school_address"
                    helperText={errors["school_address"]}
                    intent={"danger"}
                  >
                    <TextArea
                      fill={true}
                      growVertically={true}
                      id="f-school_address"
                      name="school_address"
                      placeholder="contoh: Buha, Kec. Mapanget, Kota Manado, Sulawesi Utara, Indonesia"
                      value={values["school_address"]}
                      onChange={handleChange}
                      intent={errors["school_address"] ? "danger" : "none"}
                    />
                  </FormGroup>
                  {[
                    "study_program_1",
                    "study_program_2",
                  ].map((key, idx) => (
                    <FormGroup
                      key={key}
                      label={`Program Study ${idx + 1}`}
                      labelFor={`f-${key}_id`}
                      helperText={errors[`${key}_id`]}
                      intent={"danger"}
                    >
                      <Select
                        id={`f-${key}_id`}
                        name={`${key}_id`}
                        loading={loading[key]}
                        placeholder="Pilih"
                        value={values[`${key}_id`]}
                        onChange={({ value }) => {
                          setFieldValue(`${key}_id`, value, true);
                        }}
                        intent={errors[`${key}_id`] ? "danger" : "none"}
                        options={studyPrograms[key]}
                        onOpening={() => {
                          fetchStudyPrograms(key);
                        }}
                      />
                    </FormGroup>))}
                  <Box sx={{ mt: 3 }}>
                    <Button
                      text="Simpan informasi pendaftaran"
                      type="submit"
                      intent="primary"
                      loading={isSubmitting}
                    />
                    <Button
                      minimal={true}
                      type="reset"
                      text="Reset"
                      loading={isSubmitting}
                      onClick={() => {
                        resetForm();
                      }}
                    />
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  )
}
import { Button, Card, Classes, FormGroup, H2, H3, HTMLSelect, InputGroup, Menu, MenuItem, NonIdealState, Radio, RadioGroup, Spinner } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Popover2 } from "@blueprintjs/popover2";
import { Box, CropImage, Divider, Flex, TakePhoto, useClient, getBase64, AspectRatio, toaster } from "components"
import { _base64ToArrayBuffer } from "components/base64ArrayBuffer";
import { Formik } from "formik";
import moment from "moment";
import { useNav } from "pages/Root/hoc";
import { useState } from "react";
import { useStudent } from ".";

export const Settings = ({ base }) => {
  const client = useClient();
  const student = useStudent();
  const navigation = useNav(base);

  const [photoPopover, setPhotoPopover] = useState(false);

  const [loading, setLoading] = useState({
    "file": false
  });

  if (student === null) {
    return (
      <Spinner />
    )
  }

  return (
    <Box sx={{
      py: 4,
      px: 3,
    }}>
      <Box as={H2} sx={{ mb: 2 }}>Edit Informasi</Box>
      <Divider sx={{ mb: 4 }} />
      <Formik
        initialValues={{
          "photo": {
            "cropped": `data:image/jpg;base64,${student["photo"]}`
          },
          "name": student["name"],
          "birth_city": student["birth_city"],
          "birth_date": moment(student["birth_date"], "YYYY-MM-DD").toDate(),
          "gender": student["gender"],
          "recent_address": student["recent_address"],
          "origin_address": student["origin_address"],
          "city": student["city"],
          "postal_code": student["postal_code"],
          "phone_number": student["phone_number"],
          "email": student["email"],
          "generation": student["generation"],
          "registration_number": student["registration_number"],
          "registration_date": moment(student["registration_date"], "YYYY-MM-DD").toDate(),
          "student_status": student["student_status"],
          "study_program_id": student["study_program_id"],
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = { ...values };
          if (values["photo"].cropped) {
            result["photo"] = values["photo"].cropped.split(",")[1];
            result["photo"] = _base64ToArrayBuffer(result["photo"]);
          } else {
            result["photo"] = undefined;
          }
          try {
            const res = await client["students"].patch(student["id"], result);
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
        {({ values, errors, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
          <form onSubmit={handleSubmit} >
            <Box as={H3} sx={{ mb: 3 }}>Informasi Umum</Box>
            <Box as={Card} sx={{ mb: 4 }}>
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
                <Box className={`${Classes.CARD}`} sx={{ maxWidth: 164, bg: "gray.1", p: 0, borderRadius: 4 }}>
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
                        <NonIdealState
                          title="No Photo"
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
              <FormGroup
                label="Nama"
                labelFor="f-name"
                helperText={errors["name"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-name"
                  value={values["name"]}
                  onChange={handleChange}
                  intent={errors["name"] ? "danger" : "none"}
                />
              </FormGroup>
              <Flex sx={{ mx: -3 }}>
                <Box sx={{ px: 3, width: "50%" }}>
                  <FormGroup
                    label="Tempat Lahir"
                    labelFor="f-birth_city"
                    helperText={errors["birth_city"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-birth_city"
                      value={values["birth_city"]}
                      onChange={handleChange}
                      intent={errors["birth_city"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ px: 3, width: "50%" }}>
                  <FormGroup
                    label="Tanggal Lahir"
                    labelFor="f-birth_date"
                    helperText={errors["birth_date"]}
                    intent={"danger"}
                  >
                    <DateInput
                      fill={true}
                      id="f-birth_date"
                      minDate={moment().subtract(50, "year").toDate()}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                      value={values["birth_date"]}
                      onChange={handleChange}
                      intent={errors["birth_date"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Jenis Kelamin"
                labelFor="f-gender"
                helperText={errors["gender"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-gender"
                  name="gender"
                  placeholder="Pilih"
                  value={values["gender"]}
                  onChange={handleChange}
                  intent={errors["gender"] ? "danger" : "none"}
                  options={[
                    { label: "Pria", value: "L" },
                    { label: "Wanita", value: "P" },
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Agama"
                labelFor="f-religion"
                helperText={errors["religion"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-religion"
                  name="religion"
                  placeholder="Pilih"
                  value={values["religion"]}
                  onChange={handleChange}
                  intent={errors["religion"] ? "danger" : "none"}
                  options={[
                    { label: "Kristen Protestan", value: "KRISTEN PROTESTAN" },
                    { label: "Katolik", value: "KATOLIK" },
                    { label: "Islam", value: "ISLAM" },
                    { label: "Hindu", value: "HINDU" },
                    { label: "Budha", value: "BUDHA" },
                    { label: "Lainnya", value: "LAINNYA" },
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Alamat Asal"
                labelFor="f-origin_address"
                helperText={errors["origin_address"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-origin_address"
                  name="origin_address"
                  value={values["origin_address"]}
                  onChange={handleChange}
                  intent={errors["origin_address"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Alamat Sekarang"
                labelFor="f-recent_address"
                helperText={errors["recent_address"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-recent_address"
                  name="recent_address"
                  value={values["recent_address"]}
                  onChange={handleChange}
                  intent={errors["recent_address"] ? "danger" : "none"}
                />
              </FormGroup>
              <Flex sx={{
                mx: -2,
                "> div": {
                  width: "50%",
                  px: 2,
                  flexGrow: 1,
                }
              }}>
                <Box>
                  <FormGroup
                    label="Kota"
                    labelFor="f-city"
                    helperText={errors["city"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-city"
                      name="city"
                      value={values["city"]}
                      onChange={handleChange}
                      intent={errors["city"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Kode Pos"
                    labelFor="f-postal_code"
                    helperText={errors["postal_code"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-postal_code"
                      name="postal_code"
                      value={values["postal_code"]}
                      onChange={handleChange}
                      intent={errors["postal_code"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Nomor Handphone"
                labelFor="f-phone_number"
                helperText={errors["phone_number"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-phone_number"
                  name="phone_number"
                  value={values["phone_number"]}
                  onChange={handleChange}
                  intent={errors["phone_number"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Email"
                labelFor="f-email"
                helperText={errors["email"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-email"
                  name="email"
                  value={values["email"]}
                  onChange={handleChange}
                  intent={errors["email"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Angkatan"
                labelFor="f-generation"
                helperText={errors["generation"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-generation"
                  name="generation"
                  value={values["generation"]}
                  onChange={handleChange}
                  intent={errors["generation"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Nomor Registrasi"
                labelFor="f-registration_number"
                helperText={errors["registration_number"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-registration_number"
                  name="registration_number"
                  value={values["registration_number"]}
                  onChange={handleChange}
                  intent={errors["registration_number"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Tanggal Registrasi"
                labelFor="f-registration_date"
                helperText={errors["registration_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-registration_date"
                  name="registration_date"
                  value={values["registration_date"]}
                  inputProps={{
                    intent: errors["registration_date"] ? "danger" : "none"
                  }}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("registration_date", v);
                  }}
                />
              </FormGroup>
            </Box>

            <Box as={H3} sx={{ mb: 3 }}>Akademik</Box>
            <Box as={Card} sx={{ mb: 4 }}>
              <FormGroup
                label="Status Mahasiswa"
                labelFor="f-student_status"
                helperText={errors["student_status"]}
                intent={"danger"}
              >
                <RadioGroup
                  id="f-student_status"
                  name="student_status"
                  selectedValue={values["student_status"]}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  intent={errors["student_status"] ? "danger" : "none"}
                >
                  <Radio label="Aktif" value={"true"} />
                  <Radio label="Belum Aktif" value={"false"} />
                </RadioGroup>
              </FormGroup>
            </Box>

            <Box>
              <Button intent="primary" text="Simpan Perubahan" type="submit" loading={isSubmitting} />
              <Button minimal={true} text="Cancel" onClick={() => navigation.go("/mahasiswa/:id/")} />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}
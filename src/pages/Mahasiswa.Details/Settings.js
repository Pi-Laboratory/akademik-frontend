import { Button, Card, Classes, FormGroup, H2, H3, HTMLSelect, InputGroup, Menu, MenuItem, Radio, RadioGroup, Spinner } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Popover2 } from "@blueprintjs/popover2";
import { Box, CropImage, Divider, Flex, TakePhoto, useClient, getBase64, AspectRatio, toaster, Select } from "components";
import { Formik } from "formik";
import moment from "moment";
import { useNav } from "pages/Root/hoc";
import { useCallback, useEffect, useState } from "react";
import { useStudent } from ".";
import { decode } from "base64-arraybuffer";

export const Settings = ({ base }) => {
  const client = useClient();
  const student = useStudent();
  const navigation = useNav(base);

  const [photoPopover, setPhotoPopover] = useState(false);
  const [loading, setLoading] = useState({
    "file": false,
    "province": false,
    "city": false,
    "district": false,
    "subdistrict": false,
    "neighbor": false,
  });

  const [address, setAddress] = useState({
    "province": [],
    "city": [],
    "district": [],
    "subdistrict": [],
    "neighbor": [],
  });

  const fetchAddress = useCallback(async (key, query, {
    province_id,
    city_id,
    district_id,
    subdistrict_id,
  } = {}) => {
    const result = {};
    setLoading(l => ({ ...l, [key]: true }));
    try {
      switch (key) {
        case "province":
          result[key] = (await client["provinces"].find({
            query: {
              $limit: 100,
              // "name": { $iLike: `%${query}%` },
              $select: ["id", "name"]
            }
          })).data.map((d) => ({
            label: d["name"],
            value: d["id"],
          }));
          break;
        case "city":
          result[key] = (await client["cities"].find({
            query: {
              $limit: 100,
              province_id,
              // "name": { $iLike: `%${query}%` },
              $select: ["id", "name"]
            }
          })).data.map((d) => ({
            label: d["name"],
            value: d["id"],
          }));
          break;
        case "district":
          result[key] = (await client["districts"].find({
            query: {
              $limit: 100,
              city_id,
              // "name": { $iLike: `%${query}%` },
              $select: ["id", "name"]
            }
          })).data.map((d) => ({
            label: d["name"],
            value: d["id"],
          }));
          break;
        case "subdistrict":
          result[key] = (await client["subdistricts"].find({
            query: {
              $limit: 100,
              district_id,
              // "name": { $iLike: `%${query}%` },
              $select: ["id", "name"]
            }
          })).data.map((d) => ({
            label: d["name"],
            value: d["id"],
          }));
          break;
        case "neighbor":
          result[key] = (await client["neighbors"].find({
            query: {
              $limit: 100,
              subdistrict_id,
              // "name": { $iLike: `%${query}%` },
              $select: ["id", "name"]
            }
          })).data.map((d) => ({
            label: d["name"],
            value: d["id"],
          }));
          break;
        default: break;
      }
    } catch (err) {
      console.error(err.message);
    }

    setLoading(l => ({ ...l, [key]: false }));
    setAddress(a => ({ ...a, ...result }));
  }, [client]);

  useEffect(() => {
    if (student === null) return;
    fetchAddress("province", "");
    fetchAddress("city", "", {
      province_id: student["province_id"],
    });
    fetchAddress("district", "", {
      city_id: student["city_id"],
    });
    fetchAddress("subdistrict", "", {
      district_id: student["district_id"],
    });
    fetchAddress("neighbor", "", {
      subdistrict_id: student["subdistrict_id"],
    });
  }, [student]); // eslint-disable-line react-hooks/exhaustive-deps

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
            "cropped": ""
          },
          "name": student["name"],
          "birth_city": student["birth_city"],
          "birth_date": moment(student["birth_date"], "YYYY-MM-DD").toDate(),
          "gender": student["gender"],
          "postal_code": student["postal_code"],
          "phone_number": student["phone_number"],
          "email": student["email"],
          "generation": student["generation"],
          "registration_number": student["registration_number"],
          "registration_date": moment(student["registration_date"], "YYYY-MM-DD").toDate(),
          "student_status": student["student_status"],
          "study_program_id": student["study_program_id"],

          "street": student["street"],
          "province_id": student["province_id"],
          "city_id": student["city_id"],
          "district_id": student["district_id"],
          "subdistrict_id": student["subdistrict_id"],
          "neighbor_id": student["neighbor_id"],
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = { ...values };
          if (values["photo"].cropped) {
            result["photo"] = values["photo"].cropped.split(",")[1];
            result["photo"] = decode(result["photo"]);
          } else {
            result["photo"] = undefined;
          }
          try {
            await client["students"].patch(student["id"], result);
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
                          src={`${client.host.toString()}files/students/${student["id"]}/photo.jpg`}
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
                />
              </FormGroup>
              <Flex sx={{ flexWrap: "wrap", mx: -2 }}>
                {[{
                  "label": "Provinsi",
                  "id": "province",
                }, {
                  "label": "Kabupaten / Kota",
                  "id": "city",
                }, {
                  "label": "Kecamatan",
                  "id": "district",
                }, {
                  "label": "Desa / Kelurahan",
                  "id": "subdistrict",
                }, {
                  "label": "Jaga / Lingkungan",
                  "id": "neighbor",
                }].map(({ id, label }) => (
                  <Box key={id} sx={{ width: "50%", px: 2 }}>
                    <FormGroup
                      key={id}
                      label={label}
                      labelFor={`f-${id}_id`}
                      helperText={errors[`${id}_id`]}
                      intent={"danger"}
                    >
                      <Select
                        fill={true}
                        id={`f-${id}_id`}
                        name={`${id}_id`}
                        loading={loading[id]}
                        placeholder="Pilih"
                        value={values[`${id}_id`]}
                        onChange={({ value }) => {
                          setFieldValue(`${id}_id`, value, true);
                        }}
                        // onQueryChange={(value) => {
                        //   fetchAddress(id, value);
                        // }}
                        intent={errors[`${id}_id`] ? "danger" : "none"}
                        options={address[id]}
                        onOpening={() => {
                          fetchAddress(id, "", {
                            province_id: values["province_id"],
                            city_id: values["city_id"],
                            district_id: values["district_id"],
                            subdistrict_id: values["subdistrict_id"],
                          });
                        }}
                      />
                    </FormGroup>
                  </Box>
                ))}
              </Flex>
              <FormGroup
                label="Jalan"
                labelFor="f-street"
                helperText={errors["street"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-street"
                  name="street"
                  placeholder="contoh: Jalan Rambutan, No. 2, Blok. 4"
                  value={values["street"]}
                  onChange={handleChange}
                  intent={errors["street"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Kode Pos"
                labelFor="f-postal_code"
                helperText={errors["postal_code"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-postal_code"
                  name="postal_code"
                  value={values["postal_code"]}
                  onChange={handleChange}
                  intent={errors["postal_code"] ? "danger" : "none"}
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
                      name="birth_city"
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
                      id="f-birth_date"
                      name="birth_date"
                      minDate={moment().subtract(50, "year").toDate()}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                      value={values["birth_date"]}
                      onChange={(v) => {
                        setFieldValue("birth_date", v);
                      }}
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
                label="Nomor Handphone"
                labelFor="f-phone_number"
                helperText={errors["phone_number"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-phone_number"
                  name="phone_number"
                  value={values["phone_number"]}
                  onChange={handleChange}
                  intent={errors["phone_number"] ? "danger" : "none"}
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
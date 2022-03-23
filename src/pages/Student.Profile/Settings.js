import { H2, H3, Button, Classes, Menu, MenuItem, FormGroup, InputGroup, Spinner, RadioGroup, Radio } from "@blueprintjs/core";
import { Box, CropImage, Divider, getBase64, TakePhoto, useClient, AspectRatio, toaster, Select, CONSTANTS, Flex } from "components";
import { Popover2 } from "@blueprintjs/popover2";
import * as Yup from "yup";
import { Formik } from "formik";
import { Helmet } from "react-helmet";
import { useStudent } from ".";
import { useState, useCallback } from "react";
import { DateInput } from "@blueprintjs/datetime";
import moment from "moment";
import { decode } from "base64-arraybuffer";
import { useEffect } from "react";

const Schema = {
  general: Yup.object().shape({
    "name": Yup.string().required(),
    "email": Yup.string().required(),
    "street": Yup.string().required(),
    "province_id": Yup.string().required(),
    "city_id": Yup.string().required(),
    "district_id": Yup.string().required(),
    "subdistrict_id": Yup.string().required(),
    "neighbor_id": Yup.string(),
    "birth_city": Yup.string().required(),
    "birth_date": Yup.date().required(),
    "phone_number": Yup.string().required(),
    "photo": Yup.object().shape({
      "value": Yup.string().required(),
      "name": Yup.string().required(),
      "cropped": Yup.string(),
    }),
  }),
  trustee: (trustee) => (Yup.object().shape({
    [`${trustee}_name`]: Yup.string().required(),
    [`${trustee}_birth_date`]: Yup.string().required(),
    [`${trustee}_death_date`]: Yup.string().required(),
    [`${trustee}_status`]: Yup.string().required(),
    [`${trustee}_occupation`]: Yup.string().required(),
    [`${trustee}_education`]: Yup.string().required(),
    [`${trustee}_recent_education`]: Yup.string().required(),
  }))
}

export const Settings = ({ base }) => {
  const client = useClient();
  const student = useStudent();

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
              "name": student["name"],
              "email": student["email"],
              "province_id": student["province_id"],
              "city_id": student["city_id"],
              "district_id": student["district_id"],
              "subdistrict_id": student["subdistrict_id"],
              "neighbor_id": student["neighbor_id"],
              "street": student["street"],
              "birth_city": student["birth_city"],
              "birth_date": student["birth_date"] && new Date(student["birth_date"]),
              "phone_number": student["phone_number"]
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
                    <Box sx={{ width: "50%", px: 2 }}>
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
                    </Box>
                  </Flex>
                  <Flex sx={{ flexWrap: "wrap", mx: -2 }}>
                    <Box sx={{ width: "50%", px: 2 }}>
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
                    <Box sx={{ width: "50%", px: 2 }}>
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
                    </Box>
                  </Flex>
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
                      text="Simpan Informasi Umum"
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
        {[
          ["Ayah", "father"],
          ["Ibu", "mother"],
          ["Wali", "trustee"],
        ].map((T) => (
          <Box>
            <Box as={H3} sx={{ mb: 3 }}>Informasi {T[0]}</Box>
            <Box className={Classes.CARD} sx={{ mb: 4 }}>
              <Formik
                validationSchema={Schema.trustee(T[1])}
                initialValues={{
                  [`${T[1]}_name`]: student[`${T[1]}_name`],
                  [`${T[1]}_birth_date`]: student[`${T[1]}_birth_date`],
                  [`${T[1]}_status`]: student[`${T[1]}_status`],
                  [`${T[1]}_death_date`]: student[`${T[1]}_death_date`],
                  [`${T[1]}_education`]: student[`${T[1]}_education`],
                  [`${T[1]}_recent_education`]: student[`${T[1]}_recent_education`],
                  [`${T[1]}_occupation`]: student[`${T[1]}_occupation`],
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const result = { ...values };
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
                {({ setFieldValue, handleChange, handleSubmit, resetForm, values, errors, isSubmitting }) => (
                  <Box>
                    <FormGroup
                      label="Nama"
                      labelFor={`f-${T[1]}_name`}
                      helperText={errors[`${T[1]}_name`]}
                      intent={"danger"}
                    >
                      <InputGroup
                        id={`f-${T[1]}_name`}
                        name={`${T[1]}_name`}
                        value={values[`${T[1]}_name`]}
                        onChange={handleChange}
                        intent={errors[`${T[1]}_name`] ? "danger" : "none"}
                      />
                    </FormGroup>
                    <FormGroup
                      label="Tanggal Kelahiran"
                      labelFor={`f-${T[1]}_birth_date`}
                      helperText={errors[`${T[1]}_birth_date`]}
                      intent={"danger"}
                    >
                      <DateInput
                        fill={true}
                        id={`f-${T[1]}_birth_date`}
                        name={`${T[1]}_birth_date`}
                        value={values[`${T[1]}_birth_date`]}
                        minDate={moment().subtract(100, "year").toDate()}
                        intent={errors[`${T[1]}_birth_date`] ? "danger" : "none"}
                        formatDate={date => moment(date).format("DD MMMM YYYY")}
                        parseDate={(str) => new Date(str)}
                        onChange={(v) => {
                          setFieldValue(`${T[1]}_birth_date`, v);
                        }}
                      />
                    </FormGroup>
                    <FormGroup
                      label="Pendidikan"
                      labelFor={`f-${T[1]}_education`}
                      helperText={errors[`${T[1]}_education`]}
                      intent={"danger"}
                    >
                      <Select
                        id={`f-${T[1]}_education`}
                        name={`${T[1]}_education`}
                        value={values[`${T[1]}_education`]}
                        intent={errors[`${T[1]}_education`] ? "danger" : "none"}
                        onChange={({ value }) => {
                          setFieldValue(`${T[1]}_education`, value);
                        }}
                        options={CONSTANTS["PENDIDIKAN"].map((v) => {
                          return { label: v, value: v };
                        })}
                      />
                    </FormGroup>
                    <FormGroup
                      label="Pendidikan Terakhir"
                      labelFor={`f-${T[1]}_recent_education`}
                      helperText={errors[`${T[1]}_recent_education`]}
                      intent={"danger"}
                    >
                      <Select
                        id={`f-${T[1]}_recent_education`}
                        name={`${T[1]}_recent_education`}
                        value={values[`${T[1]}_recent_education`]}
                        intent={errors[`${T[1]}_recent_education`] ? "danger" : "none"}
                        onChange={({ value }) => {
                          setFieldValue(`${T[1]}_recent_education`, value);
                        }}
                        options={CONSTANTS["PENDIDIKAN"].map((v) => {
                          return { label: v, value: v };
                        })}
                      />
                    </FormGroup>
                    <FormGroup
                      label="Pekerjaan"
                      labelFor={`f-${T[1]}_occupation`}
                      helperText={errors[`${T[1]}_occupation`]}
                      intent={"danger"}
                    >
                      <Select
                        id={`f-${T[1]}_occupation`}
                        name={`${T[1]}_occupation`}
                        value={values[`${T[1]}_occupation`]}
                        intent={errors[`${T[1]}_occupation`] ? "danger" : "none"}
                        onChange={({ value }) => {
                          setFieldValue(`${T[1]}_occupation`, value);
                        }}
                        options={CONSTANTS["PEKERJAAN"].map((v) => {
                          return { label: v, value: v };
                        })}
                      />
                    </FormGroup>
                    <FormGroup
                      label="Status"
                      labelFor={`f-${T[1]}_status`}
                      helperText={errors[`${T[1]}_status`]}
                      intent={"danger"}
                    >
                      <RadioGroup
                        inline={true}
                        id={`f-${T[1]}_status`}
                        name={`${T[1]}_status`}
                        selectedValue={values[`${T[1]}_status`]}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        intent={errors[`${T[1]}_status`] ? "danger" : "none"}
                      >
                        <Radio label="Aktif" value={"true"} />
                        <Radio label="Meninggal" value={"false"} />
                      </RadioGroup>
                    </FormGroup>
                    {values[`${T[1]}_status`] === "false" &&
                      <FormGroup
                        label="Tanggal Meninggal"
                        labelFor={`f-${T[1]}_death_date`}
                        helperText={errors[`${T[1]}_death_date`]}
                        intent={"danger"}
                      >
                        <DateInput
                          fill={true}
                          id={`f-${T[1]}_death_date`}
                          name={`${T[1]}_death_date`}
                          value={values[`${T[1]}_death_date`]}
                          minDate={moment().subtract(50, "year").toDate()}
                          intent={errors[`${T[1]}_death_date`] ? "danger" : "none"}
                          formatDate={date => moment(date).format("DD MMMM YYYY")}
                          parseDate={(str) => new Date(str)}
                          onChange={(v) => {
                            setFieldValue(`${T[1]}_death_date`, v);
                          }}
                        />
                      </FormGroup>}
                    <Box sx={{ mt: 3 }}>
                      <Button
                        text={`Simpan Informasi ${T[0]}`}
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
                )}
              </Formik>
            </Box>
          </Box>))}
      </Box>
    </>
  )
}
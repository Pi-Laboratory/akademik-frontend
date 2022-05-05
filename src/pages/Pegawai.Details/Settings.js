import { Button, Card, Classes, ControlGroup, FormGroup, H2, H3, HTMLSelect, InputGroup, Menu, MenuItem, Spinner } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Popover2 } from "@blueprintjs/popover2";
import { Box, CropImage, Divider, Flex, TakePhoto, useClient, getBase64, AspectRatio, toaster, Select } from "components";
import { Formik } from "formik";
import moment from "moment";
import { useNav } from "pages/Root/hoc";
import { useState, useCallback } from "react";
import { decode } from "base64-arraybuffer";
import { useEmployee } from "./hoc";
import { useHistory } from "react-router-dom";

const Settings = ({ base }) => {
  const client = useClient();
  const employee = useEmployee();
  const navigation = useNav(base);
  const history = useHistory();

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

  const fetchAddress = useCallback(async (key, query) => {
    const result = {};
    setLoading(l => ({ ...l, [key]: true }));
    try {
      switch (key) {
        case "province":
          result[key] = (await client["provinces"].find({
            query: {
              $limit: 100,
              // $iLike: { "name": `%${query}%` },
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
              // $iLike: { "name": `%${query}%` },
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
              // $iLike: { "name": `%${query}%` },
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
              // $iLike: { "name": `%${query}%` },
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
              // $iLike: { "name": `%${query}%` },
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
    console.log(result);
    setAddress(a => ({ ...a, ...result }));
  }, [client]);

  if (employee === null) {
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
          "name": employee["name"],
          "phone_number": employee["phone_number"],
          "gender": employee["gender"],
          "country": employee["country"],
          "province_id": employee["province_id"],
          "city_id": employee["city_id"],
          "district_id": employee["district_id"],
          "subdistrict_id": employee["subdistrict_id"],
          "neighbor_id": employee["neighbor_id"],
          "postal_code": employee["postal_code"],
          "home_address": employee["home_address"],
          "blood_type": employee["blood_type"],
          "front_degree": employee["front_degree"],
          "back_degree": employee["back_degree"],
          "nip": employee["nip"],
          "id_number": employee["id_number"],
          "birth_date": moment(employee["birth_date"], "YYYY-MM-DD").toDate(),
          "birth_city": employee["birth_city"],
          "birth_country": employee["birth_country"],
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = { ...values };
          console.log(result);
          if (values["photo"].cropped) {
            result["photo"] = values["photo"].cropped.split(",")[1];
            result["photo"] = decode(result["photo"]);
          } else {
            result["photo"] = undefined;
          }
          try {
            await client["employees"].patch(employee["id"], result);
            toaster.show({
              intent: "success",
              message: "Berhasil disimpan"
            });
            // employee.forceUpdate();
            history.go(0);
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
                          src={`${client.host.toString()}files/employees/${employee["id"]}/photo.jpg`}
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
                label="NIP"
                labelInfo="(Nomor Identitas Pegawai Negeri Sipil)"
                labelFor="f-nip"
                helperText={errors["nip"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nip"
                  name="nip"
                  value={values["nip"]}
                  onChange={handleChange}
                  intent={errors["nip"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="NIK"
                labelInfo="(Nomor Induk Kependudukan)"
                labelFor="f-id_number"
                helperText={errors["id_number"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-id_number"
                  name="id_number"
                  value={values["id_number"]}
                  onChange={handleChange}
                  intent={errors["id_number"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Name Lengkap"
                labelFor="f-name"
                helperText={errors["name"] || errors["front_degree"] || errors["back_degree"]}
                intent={"danger"}
              >
                <Box as={ControlGroup} sx={{ maxWidth: 450 }}>
                  <InputGroup
                    fill={true}
                    id="f-front_degree"
                    name="front_degree"
                    value={values["front_degree"]}
                    placeholder="Gelar Depan"
                    onChange={handleChange}
                    intent={errors["front_degree"] ? "danger" : "none"}
                  />
                  <InputGroup
                    id="f-name"
                    name="name"
                    value={values["name"]}
                    placeholder="Nama"
                    onChange={handleChange}
                    intent={errors["name"] ? "danger" : "none"}
                  />
                  <InputGroup
                    fill={true}
                    id="f-back_degree"
                    name="back_degree"
                    placeholder="Gelar Belakang"
                    value={values["back_degree"]}
                    onChange={handleChange}
                    intent={errors["back_degree"] ? "danger" : "none"}
                  />
                </Box>
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
                label="Golongan Darah"
                labelFor="f-blood_type"
                helperText={errors["blood_type"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-blood_type"
                  name="blood_type"
                  value={values["blood_type"]}
                  onChange={handleChange}
                  intent={errors["blood_type"] ? "danger" : "none"}
                  options={[
                    "O",
                    "A",
                    "B",
                    "AB"
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
                label="Negara Kelahiran"
                labelFor="f-birth_country"
                helperText={errors["birth_country"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-birth_country"
                  value={values["birth_country"]}
                  onChange={handleChange}
                  intent={errors["birth_country"] ? "danger" : "none"}
                />
              </FormGroup>
              <Flex sx={{ mx: -2 }}>
                <Box sx={{ px: 2, width: "50%" }}>
                  <FormGroup
                    label="Kota Kelahiran"
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
                <Box sx={{ px: 2, width: "50%" }}>
                  <FormGroup
                    label="Tanggal Lahir"
                    labelFor="f-birth_date"
                    helperText={errors["birth_date"]}
                    intent={"danger"}
                  >
                    <DateInput
                      id="f-birth_date"
                      minDate={moment().subtract(100, "year").toDate()}
                      formatDate={date => moment(date).format("DD MMMM YYYY")}
                      parseDate={(str) => new Date(str)}
                      value={values["birth_date"]}
                      onChange={handleChange}
                      intent={errors["birth_date"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <Flex sx={{ flexWrap: "wrap", mx: -2 }}>
                {[{
                  "label": "Provinsi",
                  "id": "province",
                }, {
                  "label": "Kabubaten / Kota",
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
                        onQueryChange={(value) => {
                          fetchAddress(id, value);
                        }}
                        intent={errors[`${id}_id`] ? "danger" : "none"}
                        options={address[id]}
                        onOpening={() => {
                          fetchAddress(id, "");
                        }}
                      />
                    </FormGroup>
                  </Box>
                ))}
                <Box sx={{ width: "50%", px: 2 }}>
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
                label="Alamat"
                labelFor="f-home_address"
                helperText={errors["home_address"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-home_address"
                  name="home_address"
                  value={values["home_address"]}
                  onChange={handleChange}
                  intent={errors["home_address"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Negara Tempat Tinggal"
                labelFor="f-country"
                helperText={errors["country"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-country"
                  name="country"
                  value={values["country"]}
                  onChange={handleChange}
                  intent={errors["country"] ? "danger" : "none"}
                />
              </FormGroup>
            </Box>
            {/* <Box as={H3} sx={{ mb: 3 }}>Akademik</Box>
            <Box as={Card} sx={{ mb: 4 }}>
              <FormGroup
                label="Status"
                labelFor="f-status"
                helperText={errors["status"]}
                intent={"danger"}
              >
                <RadioGroup
                  id="f-status"
                  name="status"
                  selectedValue={values["status"]}
                  onChange={handleChange}
                  intent={errors["status"] ? "danger" : "none"}
                >
                  <Radio label="Aktif" value={"true"} />
                  <Radio label="Tidak Aktif" value={"false"} />
                </RadioGroup>
              </FormGroup>
              <FormGroup
                label="Jenis Kepegawaian"
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
                  options={[
                    "Pengajar",
                    "Staff"
                  ]}
                />
              </FormGroup>
            </Box> */}

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

export default Settings;

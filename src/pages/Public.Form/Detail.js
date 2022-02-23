import { Button, FileInput, FormGroup, InputGroup, Spinner, TextArea } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box, CropImage, Divider, Flex, TakePhoto, useClient, getBase64 } from "components";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import moment from "moment";
import { Helmet } from "react-helmet";

const Schema = Yup.object().shape({
  "full_name": Yup.string().required(),
  "address": Yup.string().required(),
  "birth_place": Yup.string().required(),
  "birth_date": Yup.date().required(),
  "phone_number": Yup.string().required(),
  "nisn": Yup.string().required(),
  "school_name": Yup.string().required(),
  "school_address": Yup.string().required(),
  "photo": Yup.object().shape({
    "value": Yup.string().required(),
    "name": Yup.string().required(),
    "cropped": Yup.string(),
  }).required(),
});

export const Detail = () => {
  const client = useClient();
  const [defaultInfo, setDefaultInfo] = useState(null);

  const [loading, setLoading] = useState({
    "file": false
  });

  useEffect(() => {
    const account = client.account;
    const fetch = async () => {
      try {
        const res = await client.registrations.get(account.registration_id);
        setDefaultInfo(res)
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = useCallback(async (values, { touched, setErrors, setSubmitting }) => {
    const result = { ...values };
    if (values["photo"].cropped) {
      result["photo"] = values["photo"].cropped;
    } else {
      result["photo"] = undefined;
    }
    try {
      console.log(result);
      const res = await client.registrations.patch(defaultInfo["id"], result);
      console.log(values, res);
    } catch (err) {
      console.error(err);
    }
  }, [defaultInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>Pendafaran Calon Mahasiswa Baru</title>
      </Helmet>
      <Flex
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center"
        }}
      >
        {defaultInfo === null &&
          <Box sx={{ py: 5 }}>
            <Spinner />
          </Box>}
        {defaultInfo !== null &&
          <Formik
            validationSchema={Schema}
            initialValues={{
              "full_name": defaultInfo["full_name"],
              "address": defaultInfo["address"],
              "birth_place": defaultInfo["birth_place"],
              "birth_date": defaultInfo["birth_date"] && new Date(defaultInfo["birth_date"]),
              "phone_number": defaultInfo["phone_number"],
              "nisn": defaultInfo["nisn"],
              "school_name": defaultInfo["school_name"],
              "school_address": defaultInfo["school_address"],
              "photo": {
                "cropped": defaultInfo["photo"]
              }
            }}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, handleChange, handleSubmit, values, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ maxWidth: '512px', mx: 'auto', py: 3 }}>
                  <FormGroup
                    label="Nama Lengkap"
                    labelFor="f-full_name"
                    helperText={errors["full_name"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      id="f-full_name"
                      name="full_name"
                      value={values["full_name"]}
                      onChange={handleChange}
                      intent={errors["full_name"] ? "danger" : "none"}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Alamat"
                    labelFor="f-address"
                    helperText={errors["address"]}
                    intent={"danger"}
                  >
                    <TextArea
                      fill={true}
                      growVertically={true}
                      id="f-address"
                      name="address"
                      placeholder="contoh: Buha, Kec. Mapanget, Kota Manado, Sulawesi Utara, Indonesia"
                      value={values["address"]}
                      onChange={handleChange}
                      intent={errors["address"] ? "danger" : "none"}
                    />
                  </FormGroup>
                  <Flex sx={{ mx: -2 }}>
                    <Box sx={{ px: 2, width: "50%" }}>
                      <FormGroup
                        label="Tempat Lahir"
                        labelFor="f-birth_place"
                        helperText={errors["birth_place"]}
                        intent={"danger"}
                      >
                        <InputGroup
                          id="f-birth_place"
                          name="birth_place"
                          value={values["birth_place"]}
                          onChange={handleChange}
                          intent={errors["birth_place"] ? "danger" : "none"}
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
                          fill={true}
                          id="f-birth_date"
                          name="birth_date"
                          value={values["birth_date"]}
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
                  <Divider />
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
                  <Divider />
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
                    <Flex>
                      <Box sx={{ flexGrow: 1 }}>
                        <FileInput
                          id="f-photo"
                          name="photo"
                          fill={true}
                          hasSelection={!!values["photo"]}
                          text={loading["file"] ? "Loading" : values["photo"] ? values["photo"]["name"] : "Choose file..."}
                          inputProps={{
                            accept: "image/jpeg"
                          }}
                          onChange={async (ev) => {
                            let file = ev.target.files[0];
                            await setFieldValue("photo", undefined, true);
                            await setLoading(l => ({ ...l, file: true }));
                            const fileBase64 = await getBase64(file);
                            await setFieldValue("photo", { value: fileBase64, name: file["name"], cropped: null }, true);
                            await setLoading(l => ({ ...l, file: false }));
                          }}
                        />
                      </Box>
                      <Box sx={{ flexShink: 0 }}>
                        <TakePhoto
                          onCapture={async (value) => {
                            await setFieldValue("photo", {
                              name: "Webcam Capture",
                              value: value,
                              cropped: null,
                            }, true);
                          }}
                        />
                      </Box>
                      <Box sx={{ flexShink: 0 }}>
                        <CropImage
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
                      </Box>
                    </Flex>
                  </FormGroup>
                  <Box as="p" sx={{ fontSize: 0 }}>Ukuran foto 3x4.Foto Bebas Rapih.Latar Belakang Polos</Box>
                  {(defaultInfo["photo"] || values["photo"]) &&
                    <Box sx={{
                      maxWidth: 254,
                      "> img": {
                        maxWidth: "100%"
                      }
                    }}>
                      <img
                        src={defaultInfo["photo"] || values["photo"]["cropped"] || values["photo"]["value"]}
                        alt="Preview area"
                      />
                    </Box>
                  }
                  <Box sx={{ mt: 3 }}>
                    <Button text="Simpan" type="submit" intent="primary" loading={isSubmitting} />
                  </Box>
                </Box>
              </form>
            )}
          </Formik>}
      </Flex>
    </>
  )
}
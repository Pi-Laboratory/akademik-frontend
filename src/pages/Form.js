import { Button, Card, FileInput, FormGroup, InputGroup, TextArea } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box, CropImage, Flex, TakePhoto } from "components";
import { Formik } from "formik";
import { useCallback, useState } from "react";
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
})

const getBase64 = file => new Promise((resolve, reject) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
})

const Form = () => {
  const [loading, setLoading] = useState({
    "file": false
  });

  const onSubmit = useCallback(async (values, { setErrors, setSubmitting }) => {
    try {
      console.log(values);
    } catch (err) {
      console.error(err);
    }
  }, []);

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
        <Formik
          validationSchema={Schema}
          initialValues={{
            "full_name": undefined,
            "address": undefined,
            "birth_place": undefined,
            "birth_date": undefined,
            "phone_number": undefined,
            "nisn": undefined,
            "school_name": undefined,
            "school_address": undefined,
            "photo": undefined
          }}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, handleChange, handleSubmit, values, errors, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ maxWidth: '512px', mx: 'auto', py: 3 }}>
                <Box
                  as="h1"
                  sx={{
                    mt: 4,
                    mb: 3,
                    textAlign: "center",
                    fontSize: 2
                  }}
                >
                  Pendaftaran Calon Mahasiswa Baru
                </Box>
                <Card>
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
                    <InputGroup
                      id="f-school_address"
                      name="school_address"
                      value={values["school_address"]}
                      onChange={handleChange}
                      intent={errors["school_address"] ? "danger" : "none"}
                    />
                  </FormGroup>
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
                  {values["photo"] &&
                    <Box sx={{
                      "> img": {
                        maxWidth: "100%"
                      }
                    }}>
                      <img
                        src={values["photo"]["cropped"] || values["photo"]["value"]}
                        alt="Preview area"
                      />
                    </Box>
                  }
                  <Box sx={{ mt: 3 }}>
                    <Button text="Simpan" type="submit" intent="primary" loading={isSubmitting} />
                  </Box>
                </Card>
              </Box>
            </form>
          )
          }
        </Formik>
      </Flex>
    </>
  )
}
export default Form;
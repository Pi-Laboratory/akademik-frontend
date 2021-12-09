import { Button, Card, FileInput, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, CropImage, Flex, TakePhoto, TakePhotoArea } from "components";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nim": Yup.string().required(),
  "nama-lengkap": Yup.string().required(),
  "foto": Yup.object().shape({
    "value": Yup.string().required(),
    "name": Yup.string().required(),
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
  return (
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
          "nama-lengkap": undefined,
          "nim": undefined,
          "foto": undefined
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            console.log(values);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ setFieldValue, handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ maxWidth: '1000px', mx: 'auto', py: 3 }}>
              <Card>
                <FormGroup
                  label="Nama Lengkap"
                  labelFor="f-nama-lengkap"
                  helperText={errors["nama-lengkap"]}
                  intent={"danger"}
                >
                  <InputGroup
                    id="f-nama-lengkap"
                    name="nama-lengkap"
                    value={values["nama-lengkap"]}
                    onChange={handleChange}
                    intent={errors["nama-lengkap"] ? "danger" : "none"}
                  />
                </FormGroup>
                <FormGroup
                  label="NIM"
                  labelFor="f-nim"
                  helperText={errors["nim"]}
                  intent={"danger"}
                >
                  <InputGroup
                    id="f-nim"
                    name="nim"
                    value={values["nim"]}
                    onChange={handleChange}
                    intent={errors["nim"] ? "danger" : "none"}
                  />
                </FormGroup>
                <FormGroup
                  label="Foto"
                  labelFor="f-foto"
                  helperText={errors["foto"] && "foto is required"}
                  intent={"danger"}
                >
                  <Flex>
                    <Box sx={{ flexGrow: 1 }}>
                      <FileInput
                        id="f-foto"
                        name="foto"
                        fill={true}
                        hasSelection={!!values["foto"]}
                        text={loading["file"] ? "Loading" : values["foto"] ? values["foto"]["name"] : "Choose file..."}
                        inputProps={{
                          accept: "image/jpeg"
                        }}
                        onChange={async (ev) => {
                          let file = ev.target.files[0];
                          await setFieldValue("foto", undefined, true);
                          await setLoading(l => ({ ...l, file: true }));
                          const fileBase64 = await getBase64(file);
                          await setFieldValue("foto", { value: fileBase64, name: file["name"], cropped: null }, true);
                          await setLoading(l => ({ ...l, file: false }));
                        }}
                      />
                    </Box>
                    <Box sx={{ flexShink: 0 }}>
                      <TakePhoto
                        onCapture={(value) => {
                          setFieldValue("foto", {
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
                          setFieldValue("foto", {
                            ...values["foto"],
                            cropped: value,
                          }, true);
                        }}
                        src={values["foto"] && values["foto"]["value"]}
                        disabled={!values["foto"]}
                      />
                    </Box>
                  </Flex>
                </FormGroup>
                <Box as="p" sx={{ fontSize: 0 }}>Ukuran foto 3x4.Foto Bebas Rapih.Latar Belakang Polos</Box>
                {values["foto"] &&
                  <Box sx={{
                    "> img": {
                      maxWidth: "100%"
                    }
                  }}>
                    <img src={values["foto"]["cropped"] || values["foto"]["value"]} />
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
      </Formik >
    </Flex >
  )
}
export default Form;
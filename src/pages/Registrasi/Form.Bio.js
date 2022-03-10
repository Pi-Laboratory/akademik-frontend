import { Button, FileInput, FormGroup, HTMLSelect, InputGroup, TextArea } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box, CropImage, Divider, Flex, TakePhoto } from "components";
import { useFormikContext } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import moment from "moment";

export const Schema = Yup.object().shape({
  "name": Yup.string().required(),
  "origin_address": Yup.string().required(),
  "gender": Yup.string().oneOf(["L", "P"]).required(),
  "birth_city": Yup.string().required(),
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

const InitialValues = {
  "name": "",
  "origin_address": "",
  "gender": "L",
  "birth_city": "",
  "birth_date": null,
  "phone_number": "",
  "nisn": "",
  "school_name": "",
  "school_address": "",
  "photo": {
    "cropped": ""
  }
}

const getBase64 = file => new Promise((resolve, reject) => {
  var reader = new FileReader();
  try {
    reader.readAsDataURL(file);
  } catch(err) {
    reject(err);
  }
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export const FormBio = ({ goTo = () => { } }) => {

  const [loading, setLoading] = useState({
    "file": false
  });

  const {
    setFieldValue,
    handleChange,
    values,
    errors,
    isSubmitting,
    validateForm
  } = useFormikContext();

  return (
    <Box sx={{ py: 3 }}>
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
      <Flex sx={{ mx: -2 }}>
        <Box sx={{ px: 2, width: "50%" }}>
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
      {(values["photo"] && values["photo"]["value"]) &&
        <Box sx={{
          maxWidth: 254,
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
      <Flex sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          disabled={Object.keys(errors).length > 0}
          text="Simpan dan Lanjutkan"
          loading={isSubmitting}
          type="submit"
          onClick={async () => {
            const err = await validateForm();
            if (Object.keys(err).length > 0) return;
            goTo(1);
          }}
        />
      </Flex>
    </Box>
  )
}

export const StepBio = {
  panel: FormBio,
  validationSchema: Schema,
  initialValues: InitialValues
}
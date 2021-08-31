import { Classes, FormGroup, HTMLSelect, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box, Flex } from "components";
import { useFormikContext } from "formik";
import moment from "moment";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nim": Yup.string().required(),
  "name": Yup.string().required(),
  "gender": Yup.string().required(),
  "birth_city": Yup.string().required(),
  "birth_date": Yup.date().required(),
  "religion": Yup.string().required(),
  "origin_address": Yup.string().required(),
  "recent_address": Yup.string().required(),
  "city": Yup.string().required(),
  "postal_code": Yup.string().required(),
  "phone_number": Yup.string().required(),
  "email": Yup.string().required(),
  "generation": Yup.string().required(),
  "registration_number": Yup.string().required(),
  "registration_date": Yup.date().required(),
  "student_status": Yup.boolean().required(),
});

export const StepOne = {
  panel: DialogTambahStepOne,
  validationSchema: Schema
}

function DialogTambahStepOne(props) {
  const { values, errors, handleChange, setFieldValue } = useFormikContext();
  return (
    <div className={Classes.DIALOG_BODY}>
      <h5 className={Classes.HEADING}>Identitas Diri Mahasiswa</h5>
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
        label="Nama"
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
          value={values["gender"]}
          onChange={handleChange}
          intent={errors["gender"] ? "danger" : "none"}
          options={[
            { label: "Pilih", value: "", disabled: true },
            "Pria",
            "Wanita",
            "Tidak ingin disebutkan"
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
          value={values["religion"]}
          onChange={handleChange}
          intent={errors["religion"] ? "danger" : "none"}
          options={[
            { label: "Pilih", value: "", disabled: true },
            "Kristen Protestan",
            "Kristen Katholik",
            "Islam",
            "Hindu",
            "Buddha",
            "Konghucu",
            "Lainnya",
          ]}
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
            label="Kota Kelahiran"
            labelFor="f-birth_city"
            helperText={errors["birth_city"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-birth_city"
              name="birth_city"
              value={values["birth_city"]}
              onChange={handleChange}
              intent={errors["birth_city"] ? "danger" : "none"}
            />
          </FormGroup>
        </Box>
        <Box>
          <FormGroup
            label="Tanggal Kelahiran"
            labelFor="f-birth_date"
            helperText={errors["birth_date"]}
            intent={"danger"}
          >
            <DateInput
              fill={true}
              id="f-birth_date"
              name="birth_date"
              minDate={moment().subtract(50, "year").toDate()}
              value={values["birth_date"]}
              intent={errors["birth_date"] ? "danger" : "none"}
              formatDate={date => moment(date).format("DD MMMM YYYY")}
              parseDate={(str) => new Date(str)}
              onChange={(v) => {
                setFieldValue("birth_date", v);
              }}
            />
          </FormGroup>
        </Box>
      </Flex>
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
          intent={errors["registration_date"] ? "danger" : "none"}
          formatDate={date => moment(date).format("DD MMMM YYYY")}
          parseDate={(str) => new Date(str)}
          onChange={(v) => {
            setFieldValue("registration_date", v);
          }}
        />
      </FormGroup>
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

    </div>
  )
}

export default DialogTambahStepOne;

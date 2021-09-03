import { FormGroup, InputGroup, Radio, RadioGroup, Classes } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box } from "components";
import { useFormikContext } from "formik";
import moment from "moment";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "father_name": Yup.string(),
  "father_birth_date": Yup.date()
    .when("father_name", {
      is: v => !!v,
      then: Yup.date().required()
    }),
  "father_status": Yup.boolean().required(),
  "father_death_date": Yup.date()
    .when("father_status", {
      is: "false",
      then: Yup.date().required()
    }),
  "father_education": Yup.string()
    .when("father_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "father_recent_education": Yup.string()
    .when("father_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "father_occupation": Yup.string()
    .when("father_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
});

export const StepTwo = {
  panel: DialogTambahStepTwo,
  validationSchema: Schema
}

function DialogTambahStepTwo() {
  const { values, errors, handleChange, setFieldValue } = useFormikContext();
  return (
    <div className={Classes.DIALOG_BODY}>
      <Box sx={{ minHeight: "50vh" }}>
        <h5 className={Classes.HEADING}>Identitas Ayah Mahasiswa</h5>
        <FormGroup
          label="Nama"
          labelFor="f-father_name"
          helperText={errors["father_name"]}
          intent={"danger"}
        >
          <InputGroup
            fill={true}
            id="f-father_name"
            name="father_name"
            value={values["father_name"]}
            onChange={handleChange}
            intent={errors["father_name"] ? "danger" : "none"}
          />
        </FormGroup>
        {values["father_name"] && <>
          <FormGroup
            label="Tanggal Kelahiran"
            labelFor="f-father_birth_date"
            helperText={errors["father_birth_date"]}
            intent={"danger"}
          >
            <DateInput
              fill={true}
              id="f-father_birth_date"
              name="father_birth_date"
              value={values["father_birth_date"]}
              minDate={moment().subtract(100, "year").toDate()}
              intent={errors["father_birth_date"] ? "danger" : "none"}
              formatDate={date => moment(date).format("DD MMMM YYYY")}
              parseDate={(str) => new Date(str)}
              onChange={(v) => {
                setFieldValue("father_birth_date", v);
              }}
            />
          </FormGroup>
          <FormGroup
            label="Pendidikan"
            labelFor="f-father_education"
            helperText={errors["father_education"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-father_education"
              name="father_education"
              value={values["father_education"]}
              onChange={handleChange}
              intent={errors["father_education"] ? "danger" : "none"}
            />
          </FormGroup>
          <FormGroup
            label="Pendidikan Terakhir"
            labelFor="f-father_recent_education"
            helperText={errors["father_recent_education"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-father_recent_education"
              name="father_recent_education"
              value={values["father_recent_education"]}
              onChange={handleChange}
              intent={errors["father_recent_education"] ? "danger" : "none"}
            />
          </FormGroup>
          <FormGroup
            label="Pekerjaan"
            labelFor="f-father_occupation"
            helperText={errors["father_occupation"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-father_occupation"
              name="father_occupation"
              value={values["father_occupation"]}
              onChange={handleChange}
              intent={errors["father_occupation"] ? "danger" : "none"}
            />
          </FormGroup><FormGroup
            label="Status"
            labelFor="f-father_status"
            helperText={errors["father_status"]}
            intent={"danger"}
          >
            <RadioGroup
              inline={true}
              id="f-father_status"
              name="father_status"
              selectedValue={values["father_status"]}
              onChange={(e) => {
                handleChange(e);
              }}
              intent={errors["father_status"] ? "danger" : "none"}
            >
              <Radio label="Aktif" value={"true"} />
              <Radio label="Meninggal" value={"false"} />
            </RadioGroup>
          </FormGroup>
          {values["father_status"] === "false" &&
            <FormGroup
              label="Tanggal Meninggal"
              labelFor="f-father_death_date"
              helperText={errors["father_death_date"]}
              intent={"danger"}
            >
              <DateInput
                fill={true}
                id="f-father_death_date"
                name="father_death_date"
                value={values["father_death_date"]}
                minDate={moment().subtract(50, "year").toDate()}
                intent={errors["father_death_date"] ? "danger" : "none"}
                formatDate={date => moment(date).format("DD MMMM YYYY")}
                parseDate={(str) => new Date(str)}
                onChange={(v) => {
                  setFieldValue("father_death_date", v);
                }}
              />
            </FormGroup>}
        </>}
      </Box>
    </div>
  )
}

export default DialogTambahStepTwo;

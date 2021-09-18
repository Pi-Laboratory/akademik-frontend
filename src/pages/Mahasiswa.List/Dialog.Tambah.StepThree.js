import { Classes, FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box } from "components";
import { useFormikContext } from "formik";
import moment from "moment";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "mother_name": Yup.string(),
  "mother_birth_date": Yup.date()
    .when("mother_name", {
      is: v => !!v,
      then: Yup.date().required()
    }),
  "mother_status": Yup.string().required(),
  "mother_death_date": Yup.date()
    .when("mother_status", {
      is: "false",
      then: Yup.date().required()
    }),
  "mother_education": Yup.string()
    .when("mother_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "mother_recent_education": Yup.string()
    .when("mother_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "mother_occupation": Yup.string()
    .when("mother_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
});

export const StepThree = {
  panel: DialogTambahStepThree,
  validationSchema: Schema
}

function DialogTambahStepThree() {
  const { values, errors, handleChange, setFieldValue } = useFormikContext();

  return (
    <div className={Classes.DIALOG_BODY}>
      <Box sx={{ minHeight: "50vh" }}>
        <h5 className={Classes.HEADING}>Identitas Ibu Mahasiswa</h5>
        <FormGroup
          label="Nama"
          labelFor="f-mother_name"
          helperText={errors["mother_name"]}
          intent={"danger"}
        >
          <InputGroup
            fill={true}
            id="f-mother_name"
            name="mother_name"
            value={values["mother_name"]}
            onChange={handleChange}
            intent={errors["mother_name"] ? "danger" : "none"}
          />
        </FormGroup>
        {values["mother_name"] && <>
          <FormGroup
            label="Tanggal Kelahiran"
            labelFor="f-mother_birth_date"
            helperText={errors["mother_birth_date"]}
            intent={"danger"}
          >
            <DateInput
              fill={true}
              id="f-mother_birth_date"
              name="mother_birth_date"
              value={values["mother_birth_date"]}
              minDate={moment().subtract(50, "year").toDate()}
              intent={errors["mother_birth_date"] ? "danger" : "none"}
              formatDate={date => moment(date).format("DD MMMM YYYY")}
              parseDate={(str) => new Date(str)}
              onChange={(v) => {
                setFieldValue("mother_birth_date", v);
              }}
            />
          </FormGroup>
          <FormGroup
            label="Status"
            labelFor="f-mother_status"
            helperText={errors["mother_status"]}
            intent={"danger"}
          >
            <RadioGroup
              inline={true}
              id="f-mother_status"
              name="mother_status"
              selectedValue={values["mother_status"]}
              onChange={(e) => {
                handleChange(e);
              }}
              intent={errors["mother_status"] ? "danger" : "none"}
            >
              <Radio label="Aktif" value={"true"} />
              <Radio label="Meninggal" value={"false"} />
            </RadioGroup>
          </FormGroup>
          {values["mother_status"] === "false" &&
            <FormGroup
              label="Tanggal Meninggal"
              labelFor="f-mother_death_date"
              helperText={errors["mother_death_date"]}
              intent={"danger"}
            >
              <DateInput
                fill={true}
                id="f-mother_death_date"
                name="mother_death_date"
                value={values["mother_death_date"]}
                minDate={moment().subtract(100, "year").toDate()}
                intent={errors["mother_death_date"] ? "danger" : "none"}
                formatDate={date => moment(date).format("DD MMMM YYYY")}
                parseDate={(str) => new Date(str)}
                onChange={(v) => {
                  setFieldValue("mother_death_date", v);
                }}
              />
            </FormGroup>}
          <FormGroup
            label="Pendidikan"
            labelFor="f-mother_education"
            helperText={errors["mother_education"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-mother_education"
              name="mother_education"
              value={values["mother_education"]}
              onChange={handleChange}
              intent={errors["mother_education"] ? "danger" : "none"}
            />
          </FormGroup>
          <FormGroup
            label="Pendidikan Terakhir"
            labelFor="f-mother_recent_education"
            helperText={errors["mother_recent_education"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-mother_recent_education"
              name="mother_recent_education"
              value={values["mother_recent_education"]}
              onChange={handleChange}
              intent={errors["mother_recent_education"] ? "danger" : "none"}
            />
          </FormGroup>
          <FormGroup
            label="Pekerjaan"
            labelFor="f-mother_occupation"
            helperText={errors["mother_occupation"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-mother_occupation"
              name="mother_occupation"
              value={values["mother_occupation"]}
              onChange={handleChange}
              intent={errors["mother_occupation"] ? "danger" : "none"}
            />
          </FormGroup>
        </>}
      </Box>
    </div>
  )
}

export default DialogTambahStepThree;

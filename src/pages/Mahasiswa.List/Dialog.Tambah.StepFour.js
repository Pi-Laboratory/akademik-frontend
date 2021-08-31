import { Classes, FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box } from "components";
import { useFormikContext } from "formik";
import moment from "moment";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "trustee_name": Yup.string(),
  "trustee_birth_date": Yup.date()
    .when("trustee_name", {
      is: v => !!v,
      then: Yup.date().required()
    }),
  "trustee_status": Yup.string().required(),
  "trustee_death_date": Yup.date()
    .when("trustee_status", {
      is: "false",
      then: Yup.date().required()
    }),
  "trustee_education": Yup.string()
    .when("trustee_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "trustee_recent_education": Yup.string()
    .when("trustee_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
  "trustee_occupation": Yup.string()
    .when("trustee_name", {
      is: v => !!v,
      then: Yup.string().required()
    }),
});

export const StepFour = {
  panel: DialogTambahStepFour,
  validationSchema: Schema
}

function DialogTambahStepFour() {
  const { values, errors, handleChange, setFieldValue } = useFormikContext();

  return (
    <div className={Classes.DIALOG_BODY}>
      <Box sx={{ minHeight: "50vh" }}>
        <h5 className={Classes.HEADING}>Identitas Diri Mahasiswa</h5>
        <FormGroup
          label="Nama"
          labelFor="f-trustee_name"
          helperText={errors["trustee_name"]}
          intent={"danger"}
        >
          <InputGroup
            fill={true}
            id="f-trustee_name"
            name="trustee_name"
            value={values["trustee_name"]}
            onChange={handleChange}
            intent={errors["trustee_name"] ? "danger" : "none"}
          />
        </FormGroup>

        {values["trustee_name"] && <>
          <FormGroup
            label="Tanggal Kelahiran"
            labelFor="f-trustee_birth_date"
            helperText={errors["trustee_birth_date"]}
            intent={"danger"}
          >
            <DateInput
              fill={true}
              id="f-trustee_birth_date"
              name="trustee_birth_date"
              value={values["trustee_birth_date"]}
              minDate={moment().subtract(100, "year").toDate()}
              intent={errors["trustee_birth_date"] ? "danger" : "none"}
              formatDate={date => moment(date).format("DD MMMM YYYY")}
              parseDate={(str) => new Date(str)}
              onChange={(v) => {
                setFieldValue("trustee_birth_date", v);
              }}
            />
          </FormGroup>
          <FormGroup
            label="Status"
            labelFor="f-trustee_status"
            helperText={errors["trustee_status"]}
            intent={"danger"}
          >
            <RadioGroup
              inline={true}
              id="f-trustee_status"
              name="trustee_status"
              selectedValue={values["trustee_status"]}
              onChange={(e) => {
                console.log(e.target.value);
                handleChange(e);
              }}
              intent={errors["trustee_status"] ? "danger" : "none"}
            >
              <Radio label="Aktif" value={"true"} />
              <Radio label="Meninggal" value={"false"} />
            </RadioGroup>
          </FormGroup>
          {values["trustee_status"] === "false" &&
            <FormGroup
              label="Tanggal Meninggal"
              labelFor="f-trustee_death_date"
              helperText={errors["trustee_death_date"]}
              intent={"danger"}
            >
              <DateInput
                fill={true}
                id="f-trustee_death_date"
                name="trustee_death_date"
                value={values["trustee_death_date"]}
                minDate={moment().subtract(50, "year").toDate()}
                intent={errors["trustee_death_date"] ? "danger" : "none"}
                formatDate={date => moment(date).format("DD MMMM YYYY")}
                parseDate={(str) => new Date(str)}
                onChange={(v) => {
                  setFieldValue("trustee_death_date", v);
                }}
              />
            </FormGroup>}
          <FormGroup
            label="Pendidikan"
            labelFor="f-trustee_education"
            helperText={errors["trustee_education"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-trustee_education"
              name="trustee_education"
              value={values["trustee_education"]}
              onChange={handleChange}
              intent={errors["trustee_education"] ? "danger" : "none"}
            />
          </FormGroup>
          <FormGroup
            label="Pendidikan Terakhir"
            labelFor="f-trustee_recent_education"
            helperText={errors["trustee_recent_education"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-trustee_recent_education"
              name="trustee_recent_education"
              value={values["trustee_recent_education"]}
              onChange={handleChange}
              intent={errors["trustee_recent_education"] ? "danger" : "none"}
            />
          </FormGroup>
          <FormGroup
            label="Pekerjaan"
            labelFor="f-trustee_occupation"
            helperText={errors["trustee_occupation"]}
            intent={"danger"}
          >
            <InputGroup
              fill={true}
              id="f-trustee_occupation"
              name="trustee_occupation"
              value={values["trustee_occupation"]}
              onChange={handleChange}
              intent={errors["trustee_occupation"] ? "danger" : "none"}
            />
          </FormGroup>
        </>}
      </Box>
    </div>
  )
}

export default DialogTambahStepFour;

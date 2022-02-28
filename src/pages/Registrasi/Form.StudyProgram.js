import { Button, FormGroup } from "@blueprintjs/core";
import { Box, Flex, Select, useClient } from "components";
import { useFormikContext } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";

export const Schema = Yup.object().shape({
  "study_program_1_id": Yup.string()
    .notOneOf([Yup.ref("study_program_2_id")], "Program Studi harus berbeda")
    .required(),
  "study_program_2_id": Yup.string()
    .notOneOf([Yup.ref("study_program_1_id")], "Program Studi harus berbeda")
    .required(),
});

const InitialValues = {
  "study_program_1_id": "",
  "study_program_2_id": ""
}

export const FormStudyProgram = ({ goTo = () => { } }) => {
  const client = useClient();
  const [studyPrograms, setStudyPrograms] = useState({
    "study_program_1": [],
    "study_program_2": []
  })
  const [loading, setLoading] = useState({
    "study_program_1": false,
    "study_program_2": false
  });

  const fetchStudyPrograms = useCallback(async (key) => {
    setLoading(l => ({ ...l, [key]: true }));
    try {
      const res = await client["study-programs"].find({
        query: {
          $select: ["id", "name"],
          $include: [{
            model: "majors",
            $select: ["name"]
          }]
        }
      });
      setStudyPrograms(sp => ({
        ...sp,
        [key]: res.data.map(({ id, name, major }) => {
          return {
            label: name,
            value: id,
            info: major["name"]
          }
        })
      }));
    } catch (err) {
      console.error(err);
    }
    setLoading(l => ({ ...l, [key]: false }));
  }, [client]);

  const {
    setFieldValue,
    values,
    errors,
    isSubmitting,
    validateForm
  } = useFormikContext();

  return (
    <Box sx={{ py: 3 }}>
      {[
        "study_program_1",
        "study_program_2",
      ].map((key, idx) => (
        <FormGroup
          key={key}
          label={`Program Study ${idx + 1}`}
          labelFor={`f-${key}_id`}
          helperText={errors[`${key}_id`]}
          intent={"danger"}
        >
          <Select
            id={`f-${key}_id`}
            name={`${key}_id`}
            loading={loading[key]}
            placeholder="Pilih"
            value={values[`${key}_id`]}
            onChange={({ value }) => {
              setFieldValue(`${key}_id`, value, true);
            }}
            intent={errors[`${key}_id`] ? "danger" : "none"}
            options={studyPrograms[key]}
            onOpening={() => {
              fetchStudyPrograms(key);
            }}
          />
        </FormGroup>))}
      <Flex sx={{ mt: 3 }}>
        <Button
          disabled={Object.keys(errors).length > 0}
          text="Kembali"
          loading={isSubmitting}
          onClick={async () => {
            goTo(0);
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button
          disabled={Object.keys(errors).length > 0}
          text="Simpan dan Lanjutkan"
          loading={isSubmitting}
          type="submit"
          onClick={async () => {
            const err = await validateForm();
            if (Object.keys(err).length > 0) return;
            goTo(2);
          }}
        />
      </Flex>
    </Box>
  )
}

export const StepStudyProgram = {
  panel: FormStudyProgram,
  validationSchema: Schema,
  initialValues: InitialValues
}
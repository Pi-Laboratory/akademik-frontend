import { Button, Classes, ControlGroup, FormGroup, InputGroup, Radio, RadioGroup, Switch } from "@blueprintjs/core";
import { ListGroup, useClient, Box, Flex, Select } from "components";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "semester": Yup.string().required(),
  "semester_package": Yup.boolean(),
})

const DialogGenerateBatch = ({
  data,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [items, setItems] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [curriculums, setCurriculums] = useState([]);
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [loading, setLoading] = useState({
    curriculums: false,
    studyPrograms: false
  });

  const fetchSubjects = useCallback(async (curriculum_id, semester) => {
    let ret = [];
    await setLoading(l => ({ ...l, studyPrograms: true }));
    try {
      const res = await client["subjects"].find({
        query: {
          "semester": semester,
          "curriculum_id": curriculum_id,
          $select: ["id", "name", "code"],
          $include: [{
            model: "subject_lecturers",
            $select: ["id"],
            $include: [{
              model: "lecturers",
              $select: ["id"],
              $include: [{
                model: "employees",
                $select: ["id", "name"]
              }]
            }]
          }]
        }
      });
      await setSubjects(res.data);
      ret = res.data;
    } catch (err) {
      console.error(err);
    }
    await setLoading(l => ({ ...l, studyPrograms: false }));
    return ret;
  }, [client]);

  const fetchStudyPrograms = useCallback(async (query) => {
    setLoading(l => ({ ...l, studyPrograms: true }));
    try {
      const res = await client["study-programs"].find({
        query: {
          name: { $iLike: `%${query}%` },
          $select: ["id", "name"],
          $include: [{
            model: "majors",
            $select: ["name"]
          }]
        }
      });
      setStudyPrograms(res.data.map((v) => ({
        label: v["name"],
        value: v["id"],
        info: v["major"]["name"]
      })));
    } catch (err) {
      console.error(err);
    }
    setLoading(l => ({ ...l, studyPrograms: false }));
  }, [client]);

  const fetchCurriculums = useCallback(async (query, studyProgramId) => {
    setLoading(l => ({ ...l, curriculums: true }));
    try {
      const res = await client["curriculums"].find({
        query: {
          "study_program_id": studyProgramId,
          $or: [{
            name: { $iLike: `%${query}%` },
          }, {
            year: { $iLike: `%${query}%` },
          }],
          $select: ["id", "name", "year"]
        }
      });
      setCurriculums(res.data.map((v) => ({
        label: v["name"],
        value: v["id"],
        info: v["year"]
      })));
    } catch (err) {
      console.error(err);
    }
    setLoading(l => ({ ...l, curriculums: false }));
  }, [client]);

  useEffect(() => {
    if (data.length === 0) return;
    const fetch = async () => {
      try {
        let res = await client["students"].find({
          query: {
            $select: ["id", "name", "nim", "current_semester"],
            $limit: 3,
            id: { $in: data },
            $include: [{
              model: "study_programs",
              $select: ["id", "name"],
              $include: [{
                model: "majors",
                $select: ["id", "name"]
              }]
            }]
          }
        });
        setItems(res.data)
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
    fetchStudyPrograms("");
    fetchCurriculums("", undefined);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Formik
      validationSchema={Schema}
      initialValues={{
        "semester": "",
        "semester_package": false,
        "semester_curriculum": "",
        "subject_lecturer_ids": [],
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          const res = await client["contracts"].create({
            "student_ids": data,
            "semester": values["semester"],
            "subject_lecturer_ids": values["subject_lecturer_ids"],
          });
          onClose();
          onSubmitted(res);
        } catch (err) {
          console.error(err);
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue }) =>
        <form onSubmit={handleSubmit}>
          <div className={Classes.DIALOG_BODY}>
            <h4>Mahasiswa yang dipilih:</h4>
            <Box sx={{
              mb: 3
            }}>
              <ListGroup>
                {items.map((item) => (
                  <ListGroup.Item key={item["id"]}>
                    <Flex sx={{
                      "> div": {
                        width: `${100 / 3}%`
                      }
                    }}>
                      <Box>
                        <Box>
                          {item["name"]}
                        </Box>
                        <Box sx={{ color: "gray.5" }}>
                          {item["nim"]}
                        </Box>
                      </Box>
                      <Box>
                        <Box sx={{ color: "gray.5" }}>
                          Semester
                        </Box>
                        <Box>
                          {item["current_semester"]}
                        </Box>
                      </Box>
                      <Box>
                        <Box>
                          {item["study_program"]["name"]}
                        </Box>
                        <Box sx={{ color: "gray.5" }}>
                          {item["study_program"]["major"]["name"]}
                        </Box>
                      </Box>
                    </Flex>
                  </ListGroup.Item>))}
                {data.length > 3 &&
                  <ListGroup.Item>
                    <Flex sx={{
                      justifyContent: "center"
                    }}>
                      <Box>{data.length - 3} more student</Box>
                    </Flex>
                  </ListGroup.Item>}
              </ListGroup>

            </Box>
            <FormGroup
              label="Semester"
              labelFor="f-semester"
              helperText={errors["semester"]}
              intent={"danger"}
            >
              <InputGroup
                id="f-semester"
                name="semester"
                value={values["semester"]}
                onChange={handleChange}
                intent={errors["semester"] ? "danger" : "none"}
              />
            </FormGroup>
            <Switch
              value={values["semester_package"]}
              name="semester_package"
              label="Tetapkan paket semester"
              onChange={(e) => setFieldValue("semester_package", e.target.checked)}
            />
            {values["semester_package"] &&
              <>
                <FormGroup
                  label="Program Studi"
                  labelFor="f-study_program_id"
                  helperText={errors["study_program_id"]}
                  intent={"danger"}
                >
                  <Select
                    id="f-study_program_id"
                    name="study_program_id"
                    value={values["study_program_id"]}
                    loading={loading["studyPrograms"]}
                    onChange={({ value }) => {
                      setFieldValue("study_program_id", value);
                    }}
                    onCreateNew={(query) => {
                      fetchStudyPrograms(query);
                    }}
                    intent={errors["study_program_id"] ? "danger" : "none"}
                    options={studyPrograms}
                  />
                </FormGroup>
                <FormGroup
                  label="Kurikulum"
                  labelFor="f-curriculum_id"
                  helperText={errors["curriculum_id"]}
                  intent={"danger"}
                >
                  <ControlGroup>
                    <Select
                      id="f-curriculum_id"
                      name="curriculum_id"
                      value={values["curriculum_id"]}
                      loading={loading["studyPrograms"]}
                      onChange={({ value }) => {
                        setFieldValue("curriculum_id", value);
                      }}
                      onCreateNew={(query) => {
                        fetchCurriculums(query, values["study_program_id"]);
                      }}
                      intent={errors["curriculum_id"] ? "danger" : "none"}
                      options={curriculums}
                    />
                    <InputGroup
                      min={1}
                      max={8}
                      type="number"
                      leftElement={(
                        <Box
                          as="span"
                          sx={{
                            color: "gray.5",
                            lineHeight: "30px",
                            mx: 2
                          }}
                        >Semester </Box>
                      )}
                      id="f-semester_curriculum"
                      name="semester_curriculum"
                      value={values["semester_curriculum"]}
                      onChange={async (e) => {
                        const v = e.target.value;
                        await setFieldValue("semester_curriculum", v);
                        await fetchSubjects(values["curriculum_id"], v);
                        await setFieldValue("subject_lecturer_ids", []);
                      }}
                      intent={errors["semester_curriculum"] ? "danger" : "none"}
                    />
                  </ControlGroup>
                </FormGroup>
                <Box sx={{
                  mb: 3
                }}>
                  <ListGroup>
                    {subjects.map((item, idx) => {
                      return (
                        <ListGroup.Item key={item["id"]}>
                          <Flex sx={{
                            "> div": {
                              width: `${100 / 3}%`
                            }
                          }}>
                            <Box>
                              <Box>
                                {item["name"]}
                              </Box>
                              <Box sx={{ color: "gray.5" }}>
                                {item["code"]}
                              </Box>
                            </Box>
                            <Box>

                            </Box>
                            <Box>
                              <RadioGroup
                                onChange={(e) => {
                                  if (values["subject_lecturer_ids"].indexOf(e.target.value) !== -1) return;
                                  values["subject_lecturer_ids"][idx] = e.target.value;
                                  setFieldValue("subject_lecturer_ids", values["subject_lecturer_ids"]);
                                }}
                                selectedValue={values["subject_lecturer_ids"][idx]}
                              >
                                {item["subject_lecturers"].map(({ id, lecturer: { employee: { name } } }) => {
                                  return <Radio key={id} label={name} value={`${id}`} />;
                                })}
                              </RadioGroup>
                            </Box>
                          </Flex>
                        </ListGroup.Item>)
                    })}
                    {data.length > 3 &&
                      <ListGroup.Item>
                        <Flex sx={{
                          justifyContent: "center"
                        }}>
                          <Box>{data.length - 3} more student</Box>
                        </Flex>
                      </ListGroup.Item>}
                  </ListGroup>
                </Box>
              </>
            }
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                minimal={true}
                intent="danger"
                text="Close"
                onClick={() => {
                  onClose();
                }}
              />
              <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
            </div>
          </div>
        </form>
      }
    </Formik>
  )
}

export default DialogGenerateBatch;
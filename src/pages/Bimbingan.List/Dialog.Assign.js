import { Button, Classes, Dialog, FormGroup } from "@blueprintjs/core";
import { ListGroup, useClient, Box, Flex, Select } from "components";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "lecturer_id": Yup.string().required(),
})

export const DialogAssign = ({
  isOpen,
  data,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [items, setItems] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState({
    lecturers: false
  });

  const fetchLecturers = useCallback(async (query) => {
    let ret = [];
    await setLoading(l => ({ ...l, lecturers: true }));
    try {
      const res = await client["lecturers"].find({
        query: {
          $select: ["id", "nidn"],
          $include: [{
            model: "employees",
            $select: ["id", "name", "nip"],
            $where: {
              name: {
                $iLike: `%${query}%`
              }
            }
          }]
        }
      });
      console.log(res);
      await setLecturers(res.data.map((x) => ({
        label: x["employee"]["name"],
        value: x["id"],
        info: x["nidn"],
      })));
      ret = res.data;
    } catch (err) {
      console.error(err);
    }
    await setLoading(l => ({ ...l, lecturers: false }));
    return ret;
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
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Assign pembimbing"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "lecturer_id": ""
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          let result = data.map((student_id) => ({
            "lecturer_id": values["lecturer_id"],
            "student_id": student_id,
            "achievements": []
          }));
          console.log(result);
          try {
            const res = await client["preceptors"].create(result);
            console.log(res);
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
                label="Dosen"
                labelFor="f-lecturer_id"
                helperText={errors["lecturer_id"]}
                intent={errors["lecturer_id"] ? "danger" : "none"}
              >
                <Select
                  id="f-lecturer_id"
                  name="lecturer_id"
                  value={values["lecturer_id"]}
                  loading={loading["lecturers"]}
                  onOpening={() => {
                    fetchLecturers("");
                  }}
                  onChange={({ value }) => {
                    setFieldValue("lecturer_id", value);
                  }}
                  onCreateNew={(query) => {
                    fetchLecturers(query);
                  }}
                  intent={errors["lecturer_id"] ? "danger" : "none"}
                  options={lecturers}
                />
              </FormGroup>
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
    </Dialog>
  )
}
